/* eslint-disable no-undef */

const db = require("../data/db.json");

class Tickets {
  static tickets = [];

  /**
   *
   * @returns {Array<TicketModel>}
   */
  static async getAll() {
    const { tickets } = db;
    Tickets.tickets = tickets;
    return tickets;
  }
}

module.exports = Tickets;
