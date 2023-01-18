/* eslint-disable no-undef */
const TicketModel = require("../model/Ticket");
const TicketsModel = require("../model/Tickets");
const Users = require("../model/Users");
const paginate = require("../services/pagination");
const stringsoSlug = require("../services/text");

class TicketController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.modelTicket = new TicketsModel();
    this.modelUser = new Users();
  }

  async GET() {
    // get user
    this.user = await this.modelUser.findUserById(this.req.userId);
    // get query parameters
    let { id, name, page, status, priority } = this.req.query;
    id = id || this.req.path.split("/tickets/").at(1);
    page = parseInt(page) || 1;

    let data;

    // get by id
    if (id) {
      data = await this.modelTicket.getById(id);

      if (data?.createBy === this.req.userId || this.user.role === "manager") {
        data = await this.combineData(data);
        return this.res.json(data);
      }
      return this.res.sendStatus(403);
    }

    // get list Ticket

    data = await this.modelTicket.getAll();

    // query like name
    if (name) {
      data = data.filter((ticket) =>
        stringsoSlug(ticket.name).includes(stringsoSlug(name)),
      );
    }

    // Filter by status
    if (status) {
      status = parseInt(status, 10);
      data = data.filter((ticket) => ticket.status === status);
    }

    // Filter by Priority
    if (priority) {
      priority = parseInt(priority, 10);
      data = data.filter((ticket) => ticket.priority === priority);
    }

    // if user token is developer
    if (this.user.role !== "manager") {
      data = data.filter((ticket) => ticket.createBy === this.req.userId);
    }

    const length = data?.length;

    let pages = paginate(data);
    data = pages[page - 1];
    data = await this.combineDatas(data);
    return this.res.json({
      data,
      meta: {
        current_page: page,
        total_pages: pages.length,
        total_items: length,
      },
    });
  }

  async POST() {
    const { status, priority, name, description, assignBy, dueDate } =
      this.req.body;
    const createBy = this.req.userId;
    const createDate = new Date();

    let ticket = await this.modelTicket.add({
      assignBy,
      description,
      dueDate,
      name,
      priority,
      status,
      createBy,
      createDate,
    });
    if (ticket) {
      this.res.status(201);
      ticket = await this.combineData(ticket);
      return this.res.json(ticket);
    }
    return this.res.sendStatus(500);
  }

  async PUT() {
    const { status, priority, name, description, assignBy, dueDate, id } =
      this.req.body;

    let ticket = await this.modelTicket.getById(id);
    const { createBy } = ticket;
    const user = await this.modelUser.findUserById(this.req.userId);
    const { role } = user;

    if (role !== "manager" && createBy !== this.req.userId)
      return this.res.sendStatus(403);

    ticket = await this.modelTicket.update({
      assignBy,
      description,
      dueDate,
      name,
      priority,
      status,
      id,
    });

    ticket = await this.combineData(ticket);

    if (ticket) return this.res.json(ticket);
    return this.res.sendStatus(500);
  }

  async DELETE() {
    const id = this.req.path.split("/").at(-1);
    const ticket = await this.modelTicket.getById(id);
    const { createBy } = ticket;
    const user = await this.modelUser.findUserById(this.req.userId);
    const { role } = user;

    if (role !== "manager" && createBy !== this.req.userId)
      return this.res.sendStatus(403);

    const deleteTicket = await this.modelTicket.delete(id);
    if (deleteTicket) return this.res.json(deleteTicket);
    return this.res.sendStatus(500);
  }

  async combineData(item) {
    const user = await this.modelUser.findUserById(item.assignBy);
    if (user === undefined) return;
    const tItem = {
      ...item,
      avatar: user.avatarUrl || "",
      assignByName: `${user.firstName} ${user.lastName}`,
    };
    return tItem;
  }

  /**
   *
   * @param {<Array<Ticket>} data
   * @returns
   */
  async combineDatas(data) {
    if (data)
      data =
        Array.from(data).length > 0
          ? (
              await Promise.all(data.map((item) => this.combineData(item)))
            ).filter((item) => item !== undefined)
          : (data = this.combineData(data));
    return data;
  }
}

module.exports = TicketController;
