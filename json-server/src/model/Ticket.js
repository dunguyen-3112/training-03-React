/* eslint-disable no-undef */
const uuid = require("uuid");
const { priorities, statuses } = require("../config/constant");
const db = require("../data/db.json");
const { isValidDate } = require("../services/validate");
const saveChanges = require("./utils");

class Ticket {
  constructor({
    id,
    name,
    dueDate,
    description,
    assignBy,
    priority,
    status,
    createDate,
    createBy,
  }) {
    Object.assign(this, {
      id,
      name,
      dueDate,
      description,
      assignBy,
      priority,
      status,
      createDate,
      createBy,
    });
  }

  compare({ name, dueDate, description, priority, status, assignBy }) {
    const isCompare =
      name === this.name &&
      description === this.description &&
      priority === this.priority &&
      status === this.status &&
      dueDate === this.dueDate &&
      assignBy === this.assignBy;

    return isCompare;
  }

  validate() {
    const {
      name,
      dueDate,
      description,
      assignBy,
      priority,
      status,
      createDate,
      createBy,
    } = this;

    const _dueDate = new Date(dueDate);
    const _createDate = new Date(createDate);

    const isValid = name;
    typeof name === "string" &&
      name.trim().length > 0 &&
      dueDate &&
      isValidDate(dueDate) &&
      _dueDate.toString() !== "Invalid Date" &&
      _dueDate.getTime() > _createDate.getTime() &&
      _createDate.getTime() < new Date().getTime() &&
      description &&
      typeof description === "string" &&
      description.trim().length > 0 &&
      assignBy &&
      createDate &&
      isValidDate(createDate) &&
      priority &&
      priorities.includes(priority) &&
      status &&
      statuses.includes(status) &&
      createBy &&
      db.users.find((user) => user.id === createBy) !== null;
    return isValid;
  }

  /**
   * @param {string}
   * @returns {Ticket}
   */
  static async getById(id) {
    const ticket = await db.tickets.find((ticket) => ticket.id === id);
    return ticket;
  }

  /**
   *
   * @param {Ticket} param0
   * @returns {Ticket}
   */
  static async add(ticket) {
    ticket = new Ticket({
      id: uuid.v4(),
      ...ticket,
    });
    db.tickets.push(ticket);
    saveChanges(db);
    return ticket;
  }

  /**
   *
   * @param {Ticket} param0
   * @returns {Ticket}
   */
  static async update(data) {
    let ticketCurrent = db.tickets.find((ticket) => ticket.id === data.id);
    const isChange = new Ticket(data).compare(ticketCurrent);

    if (!isChange) {
      ticketCurrent = {
        ...ticketCurrent,
        ...data,
        createBy: ticketCurrent.createBy,
        createDate: ticketCurrent.createDate,
      };

      db.tickets = db.tickets.filter((ticket) => ticket.id !== data.id);
      db.tickets.push(ticketCurrent);

      saveChanges(db);
    }

    return ticketCurrent;
  }

  /**
   *
   * @param {string} id
   * @returns {Ticket}
   */
  static async delete(id) {
    const ticket = db.tickets.find((ticket) => ticket.id === id);

    db.tickets = db.tickets.filter((ticket) => ticket.id !== id);

    saveChanges(db);

    return { data: ticket };
  }
}

// eslint-disable-next-line no-undef
module.exports = Ticket;
