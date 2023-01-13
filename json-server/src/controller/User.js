/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

class UserController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async GET() {
    const path = this.req.path;

    if (path.split("/").at(-1) === "me") {
      const meId = this.req.userId;
      const { firstName, lastName, avatarUrl } = await User.findUserById(meId);
      const responeData = {
        name: `${firstName} ${lastName}`,
        avatar: avatarUrl,
      };
      return this.res.json(responeData);
    }

    const { _query } = this.req.query;

    if (_query) {
      const data = await User.searchUser(_query);
      const users = data.map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatarUrl,
        id: user.id,
      }));
      return this.res.json(users);
    }
    const id = path.split("/users/").at(-1);
    console.log(37, path);

    if (id) {
      let user = await User.findUserById(id);
      console.log(41, path);
      if (user) {
        user = {
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.avatarUrl,
          id: user.id,
          email: user.email,
          password: jwt.sign(user.password, process.env.PASSWORD_TOKEN_SECRET),
        };
        return this.res.json(user);
      }
      return this.res.sendStatus(404);
    }

    return this.res.sendStatus(403);
  }
}

module.exports = UserController;
