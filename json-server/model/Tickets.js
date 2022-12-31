/* eslint-disable no-undef */

const db = require('../db.json');

class Tickets {
    static tickets = [];

    /**
     *
     * @returns {Array<TicketModel>}
     */
    static async getAll() {
        const tickets = db.tickets;
        Tickets.tickets = tickets;
        return tickets;
    }
}

module.exports = Tickets;
