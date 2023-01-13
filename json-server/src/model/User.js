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
   * @param {string} email
   * @returns User
   */
  static async findUserByEmail(email) {
    return await db.users.find((user) => user.email === email);
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
        user.firstName.toLowerCase().includes(query),
    );
    return users;
  }
}

module.exports = User;
