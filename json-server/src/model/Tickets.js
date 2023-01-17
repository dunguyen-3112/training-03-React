/* eslint-disable no-undef */
const cry = require("crypto");
const db = require("../data/db.json");
const saveChanges = require("./utils");
const Ticket = require("./Ticket");

class Tickets {
  tickets;

  constructor() {
    if (this.tickets === undefined) {
      this.tickets = db.tickets;
    }
  }

  /**
   *
   * @returns {Array<Ticket>}
   */
  async getAll() {
    return this.tickets;
  }

  /**
   *
   * @param {Ticket} ticket
   * @returns {Ticket}
   */
  async add(data) {
    const ticket = new Ticket({
      id: cry.randomUUID(),
      ...data,
    });
    const tickets = this.tickets;
    this.tickets = [ticket, ...tickets];
    db.tickets = this.tickets;
    saveChanges(db);
    return ticket;
  }

  /**
   *
   * @param {Ticket} data
   * @returns {Ticket}
   */
  async update(data) {
    let currentTicket = this.tickets.find((ticket) => ticket.id === data.id);
    const isChange = new Ticket(data).compare(currentTicket);

    if (!isChange) {
      currentTicket = {
        ...currentTicket,
        ...data,
        createBy: currentTicket.createBy,
        createDate: currentTicket.createDate,
      };

      this.tickets = this.tickets.filter((ticket) => ticket.id !== data.id);
      this.tickets = [currentTicket, ...this.tickets];
      db.tickets = this.tickets;
      saveChanges(db);
    }

    return currentTicket;
  }

  /**
   * @param {string} id
   * @returns {Ticket}
   */
  async getById(id) {
    const ticket = await this.tickets.find((ticket) => ticket.id === id);
    return ticket;
  }

  /**
   *
   * @param {string} id
   * @returns {Ticket}
   */
  async delete(id) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    this.tickets = db.tickets.filter((ticket) => ticket.id !== id);
    db.tickets = this.tickets;
    saveChanges(db);

    return { data: ticket };
  }
}

module.exports = Tickets;
