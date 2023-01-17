/* eslint-disable no-undef */
const db = require("../data/db.json");
const User = require("./User");

class Users {
  users;

  constructor() {
    if (this.users === undefined) {
      this.users = db.users;
    }
  }
  /**
   *
   * @param {string} id
   * @returns {User} user
   */
  async findUserById(id) {
    return await this.users.find((user) => user.id === id);
  }

  /**
   *
   * @param {string} email
   * @returns {User} user
   */
  async findUserByEmail(email) {
    return await this.users.find((user) => {
      if (user.email === email) {
        return user;
      }
    });
  }

  /**
   *
   * @param {string} query
   * @returns {Array<User>} users
   */
  async searchUser(query) {
    query = query.toLowerCase();
    const users = await this.users.filter(
      (user) =>
        user.lastName.toLowerCase().includes(query) ||
        user.firstName.toLowerCase().includes(query),
    );
    return users;
  }
}

module.exports = Users;
