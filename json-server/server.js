/* eslint-disable no-undef */
const jsonServer = require("json-server");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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

  if (path.includes("/api/v1/") === false) {
    return res.sendStatus(404);
  }
  if (req.path.split("/")[3] !== "login") authenticateToken(req, res);
  routes(req, res);
});

server.use("/api/v1", router);

server.listen(PORT, () => {
  console.log("JSON Server is running on port " + PORT);
});

function authenticateToken(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const SECRET =
    req.path.split("/")[3] != "token"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, { id }) => {
    if (err) return res.sendStatus(403);
    req.userId = id;
  });
}
