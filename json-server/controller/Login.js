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

  GET() {
    const route = this.req.path.split("/").at(-1);
    if (route !== "token") return this.res.sendStatus(403);
    const token = generateAccessToken({ id: this.req.userId });
    return this.res.json({
      token,
    });
  }

  POST() {
    const route = this.req.path.split("/").at(-1);

    if (route === "logout") {
      const authHeader = this.req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      LoginController.refreshTokens.pop(token);
      return this.res.sendStatus(200);
    }
    const { email, password } = this.req.body;

    let user = db.users.find((user) => user.email === email);

    if (user?.password !== password) {
      this.res.status(401);
      return this.res.json({
        message: "Login failed! You please check email or password ?",
      });
    }
    const access_token = generateAccessToken({
      id: user.id,
    });
    const refresh_token = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    LoginController.refreshTokens.push(refresh_token);

    return this.res.json({
      status: 200,
      message: "Login successful!",
      access_token,
      refresh_token,
    });
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

module.exports = LoginController;
