/* eslint-disable no-undef */
const jsonServer = require("json-server");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const LoginController = require("./controller/Login");

const routes = require("./routes");

const fileName = "./db.json";

const PORT = process.env.PORT || 3000;

const server = jsonServer.create();
const router = jsonServer.router(fileName);
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use((req, res) => {
  authenticateToken(req, res);
  routes(req, res);
});

server.use("/api/v1", router);

server.listen(PORT, () => {
  console.log("JSON Server is running on port " + PORT);
});

function authenticateToken(req, res) {
  console.log("Route: ", req.path);
  const route = req.path.split("/").at(-1);
  // if route is login then pass authentication
  if (route === "login") return;
  const SECRET =
    route === "token" || route === "logout"
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET;

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, { id }) => {
    if (err) return res.sendStatus(403);
    req.userId = id;
    console.log(id);
  });
}
