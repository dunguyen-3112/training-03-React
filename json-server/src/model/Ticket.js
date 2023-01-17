const { priorities, statuses } = require("../config/constant");
const db = require("../data/db.json");
const { isValidDate } = require("../services/validate");

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

  /**
   *
   * @param {Ticket} data
   * @returns {boolean}
   */
  compare(data) {
    try {
      const { name, dueDate, description, priority, status, assignBy } = data;
      const isCompare =
        name === this.name &&
        description === this.description &&
        priority === this.priority &&
        status === this.status &&
        dueDate === this.dueDate &&
        assignBy === this.assignBy;

      return isCompare;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * @param {Ticket} data
   * @returns {boolean}
   */
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
}

module.exports = Ticket;
