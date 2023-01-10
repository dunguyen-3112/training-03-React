/* eslint-disable no-undef */
const db = require("../db.json");

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

  /**
   *
   * @param {string} id
   * @returns User
   */
  static async findUserById(id) {
    return await db.users.find((user) => user.id === id);
  }

  /**
   *
   * @param {string} query
   * @returns
   */
  static async searchUser(query) {
    query = query.toLowerCase();
    const users = await db.users.filter(
      (user) =>
        user.lastName.toLowerCase().includes(query) ||
        user.firstName.toLowerCase().includes(query)
    );
    console.log(users);
    return users;
  }
}

module.exports = User;
