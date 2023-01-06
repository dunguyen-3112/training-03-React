/* eslint-disable no-undef */
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async GET() {
    const { password, email, firstName, lastName, avatarUrl } =
      await User.findUserById(this.req.userId);
    const _password = jwt.sign(password, process.env.PASSWORD_SECRET);
    return this.res.json({
      password: _password,
      email,
      name: `${firstName} ${lastName}`,
      avatarUrl,
    });
  }
}

module.exports = UserController;
