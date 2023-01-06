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
  const path = req.path;
  const route = req.path.split("/").at(-1);

  console.log("Routing: " + route);
  if (path.includes("/api/v1/") === false) return res.sendStatus(404);
  if (route === "login" || route === "logout") return routes(req, res);
  authenticateToken(req, res);
  req.userId !== undefined && routes(req, res);
});

server.use("/api/v1", router);

server.listen(PORT, () => {
  console.log("JSON Server is running on port " + PORT);
});

function authenticateToken(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const route = req.path.split("/")[3];
  const SECRET =
    route != "token"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;
  jwt.verify(token, SECRET, (err, { id }) => {
    if (err) return res.sendStatus(403);
    req.userId = id;
  });
}
