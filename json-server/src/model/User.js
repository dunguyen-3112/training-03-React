/* eslint-disable no-undef */
const db = require("../data/db.json");

class User {
  constructor({ email, password, firstName, lastName, avatarUrl, role, id }) {
    Object.assign(this, {
      email,
      password,
      firstName,
      lastName,
      avatarUrl,
      role,
      id,
    });
  }
}

module.exports = User;
