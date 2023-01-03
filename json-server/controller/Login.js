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
    if (this.req.userId !== undefined) return;
    const { email, password } = this.req.body;

    let user = db.users.find((user) => user.email === email);

    console.log("email: ", email, "password: ", password);
    if (user?.password !== password) this.res.status(401);
    return this.res.json({
      message: "Login failed! You please check email or password ?",
    });
    const access_token = generateAccessToken({
      id: user.id,
    });
    const refresh_token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
  //     expiresIn: '15s',
  // });
}

module.exports = LoginController;
