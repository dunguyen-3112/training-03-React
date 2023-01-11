/* eslint-disable no-undef */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../db.json");

class LoginController {
  static refreshTokens = [];
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  POST() {
    const date = new Date();
    const route = this.req.path.split("/").at(-1);

    // extract the refresh token from the request
    const authHeader = this.req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    let refreshToken;
    let accessToken;

    if (route === "logout") {
      LoginController.refreshTokens.pop(token);
      return this.res.sendStatus(200);
    } else if (route === "token") {
      accessToken = generateAccessToken({
        id: this.req.userId,
        date: date.getTime(),
      });
      return this.res.json({ accessToken });
    }

    const { username, password } = this.req.body;

    const user = db.users.find((user) => user.email === username);

    if (user?.password !== password) {
      this.res.status(401);
      return this.res.json({
        message: "Login failed! You please check email or password ?",
      });
    }

    accessToken = generateAccessToken({ id: user.id, date: date.getTime() });
    refreshToken = jwt.sign(
      { id: user.id, date: date.getTime() },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    LoginController.refreshTokens.push(refreshToken);

    return this.res.json({
      accessToken,
      refreshToken,
      id: user.id,
    });
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

module.exports = LoginController;
