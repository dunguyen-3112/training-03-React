/* eslint-disable no-undef */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../model/Users");

class LoginController {
  static refreshTokens = [];

  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.model = new Users();
  }

  async POST() {
    const date = new Date();
    const route = this.req.path.split("/").at(-1);

    // extract the refresh token from the request
    const authHeader = this.req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    let refreshToken;
    let accessToken;

    if (route === "logout") {
      LoginController.refreshTokens.pop(token);
      return this.res.sendStatus(200);
    }
    if (route === "token") {
      accessToken = generateAccessToken({
        id: this.req.userId,
        date: date.getTime(),
      });
      return this.res.json({ accessToken });
    }

    const { email, password } = this.req.body;

    const user = await this.model.findUserByEmail(email);

    if (user) {
      if (user.password !== password) return this.res.sendStatus(401);
      accessToken = generateAccessToken({ id: user.id, date: date.getTime() });
      refreshToken = jwt.sign(
        { id: user.id, date: date.getTime() },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        },
      );
      LoginController.refreshTokens.push(refreshToken);

      return this.res.json({
        accessToken,
        refreshToken,
      });
    }

    return this.res.sendStatus(400);
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

module.exports = LoginController;
