const fs = require("fs");
const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const fileName = "./db.json";

const PORT = process.env.PORT || 3000;

const server = jsonServer.create();
const router = jsonServer.router(fileName);
const middlewares = jsonServer.defaults();

const db = require(fileName);

const jwt = require("jsonwebtoken");
const { url } = require("inspector");
const { request } = require("http");
const privateKey = "31122001";

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/users": "/users",
  })
);

server.use(jsonServer.bodyParser);

const handleRole = (role, handle1, handle2) => {
  switch (role) {
    case "manager":
      handle1();
      break;
    case "developer":
      handle2();

    default:
      handle2();
      break;
  }
};

const saveData = () => {
  fs.writeFile(fileName, JSON.stringify(db), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(db));
    console.log("writing to " + fileName);
  });
};

let user;

server.use((req, res, next) => {
  try {
    const urls = req.path.split("/");
    const query = req.query;

    if (urls[1].localeCompare("login") !== 0) {
      const { id, date } = jwt.verify(query?.access_token, privateKey);
      user = db.users.find((user) => user.id === id);
      if (user === null) {
        res.json("Not found user!");
      }
    }

    switch (urls[1]) {
      // handle login request
      case "login":
        const { email, password } = req.body;
        user = db.users.find((user) => user.email === email);

        if (user?.password === password) {
          const date = Math.floor(Date.now() / 1000) + 60 * 60;

          const access_token = jwt.sign({ id: user.id, date }, privateKey);

          res.json({
            status: 200,
            message: "Login successful!",
            access_token,
          });
        } else
          res.json({
            status: 401,
            message: "Login failed! You please check email or password ?",
          });

      // handle route users
      case "users":
        if (req.method === "POST") {
          const handleManager = () => {
            const isEmailExit = db.users.some(
              (user) => user.email === req.body.email
            );

            !isEmailExit
              ? next()
              : res.json({
                  status: 400,
                  message: "Email already exists!",
                });
          };

          user &&
            handleRole(user.role, handleManager, () =>
              res.json({ status: 403, message: "Forbidden!" })
            );
        } else if (req.method === "GET") {
          // handle get all users, if is manager return all, if developer return that develop info
          handleRole(user.role, next, () => {
            res.json({ status: 201, data: [user] });
          });
        }

        break;

      // handle route tickets
      case "tickets":
        const method = req.method;

        switch (method) {
          case "GET":
            let resTicket;
            if (urls.length > 2) {
              resTicket = db.tickets.find(
                (ticket) => ticket.id === urls[2] && ticket.createBy === user.id
              );
            } else {
              resTicket = db.tickets.filter(
                (ticket) => ticket.createBy === user.id
              );
              if (resTicket == null) resTicket = [];
            }

            handleRole(user.role, next, () => {
              res.json({ status: 201, data: resTicket });
            });

            break;
          case "DELETE":
            const handleDeveloper = () => {
              console.log(urls[2]);
              const ticket = db.tickets.find(
                (ticket) => ticket.id.localeCompare(urls[2]) === 0
              );
              if (ticket == null || ticket.createBy !== user.id)
                res.json({ status: 400, message: "Not found" });
              else next();
            };
            handleRole(user.role, next, handleDeveloper);

            break;
          case "POST":
            const body = req.body;

            const newTicket = {};

            Object.assign(newTicket, {
              id: uuidv4(),
              createDate: new Date(),
              dueDate: new Date(),
              createBy: user.id,
              ...body,
            });

            const isStatusValid = db.statuses.find(
              (status) => status.id === newTicket.status
            );
            const ispriorityValid = db.priorities.find(
              (priority) => priority.id === newTicket.priority
            );

            db.tickets.push(newTicket);

            saveData();
            res.json({
              status: 201,
              message: "Create new Ticket success!",
              data: newTicket,
            });

            break;
          case "PUT":
            const ticket = db.tickets.find((ticket) => ticket.id === urls[2]);

            if (!ticket) res.json({ status: 400, message: "Not found" });
            console.log(ticket, user);
            if (user.role === "manager" || user.id === ticket.createBy) {
              next();
              return;
            }
            res.json({ status: 403, message: "Forbidden!" });

          default:
            res.json({ status: 400, message: "Not found" });
            break;
        }

        break;

      default:
        next();
        break;
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 403,
      message: "Forbidden",
      detail: error,
    });
  }
});

server.use(router);

server.listen(PORT, () => {
  console.log("JSON Server is running on port " + PORT);
});

router.render = (req, res) => {
  const urls = req.path.split("/");
  let data = res.locals.data;

  //handle login and response access_token
  if (urls[1] === "users" && req.method === "POST") {
    const date = Math.floor(Date.now() / 1000) + 60 * 60;
    const tk = jwt.sign({ id: data.id, date }, privateKey);
    res.json({ access_token: tk, status: 200 });
  } else res.json({ body: data });
};
