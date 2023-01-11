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
    const { _query } = this.req.query;
    if (_query) {
      const data = await User.searchUser(_query);
      const users = data.map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatarUrl,
        id: user.id,
      }));
      return this.res.json({ data: users });
    }
    const id = this.req.path.split("/users/").at(-1)
    console.log("ID: ",id);
    if (id) {
      let user = await User.findUserById(id);
      if (user)
        user = {
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatarUrl,
          id: user.id,
          email: user.email,
          password: jwt.sign(user.password, process.env.PASSWORD_SECRET)
        };
      return this.res.json(user);
    }
    return this.res.sendStatus(403);
  }
}

module.exports = UserController;
