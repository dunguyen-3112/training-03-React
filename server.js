const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");

const userdb = JSON.parse(fs.readFileSync("data.json", "UTF-8"));

const privateKey = "31122001";

console.log(userdb);

server.use(middlewares);

server.get("/echo", (req, res) => {
    res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    const url = req.url.split("/")[1];
    if (req.method === "POST") {
        switch (url) {
            case "signup":
                console.log("check: " + url);
                break;
            case "login":
                console.log(req.body);
                res.json({ id: "1234" });
                break;
            case "checkLogin":
                console.log(req.body);
                res.json({ id: "1234" });
                break;

            default:
                break;
        }
    }
    next();
});

// server.use(
//   jsonServer.rewriter({
//     "api/v1/getusers?id=:uid": "/api/users/:uid",
//   })
// );

// Use default router
server.use("/api", router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});

router.render = (req, res) => {
    const url = req.url.split("/")[1];

    let data;

    console.log("render: " + url);

    switch (url) {
        case "users":
            const { firstName, lastName, avatarUrl } = res.locals.data;
            data = { firstName, lastName, avatarUrl };
            break;
        case "signup":
            const { email, password } = res.locals.data;
            const access_token = jwt.sign(
                {
                    email,
                    password,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                },
                privateKey
            );
            data = { access_token, email };
            console.log(data);
            break;
        default:
            break;
    }
    res.jsonp({ data });
};
