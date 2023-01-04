/* eslint-disable no-undef */
const TicketModel = require("../model/Ticket");
const TicketsModel = require("../model/Tickets");
const User = require("../model/User");
const paginate = require("../services/pagination");

class TicketController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async GET() {
    this.user = await User.findUserById(this.req.userId);
    const id = this.req.query._ticketId || this.req.path.split("/")[4];
    const page = parseInt(this.req.query._page) || 1;

    let data;
    let pages;

    if (id) {
      data = await TicketModel.getById(id);
      if (
        data &&
        (data.createBy === this.req.userId || this.user.role === "manager")
      )
        return this.res.json({ data });
      return this.res.sendStatus(404);
    }

    data = await TicketsModel.getAll();
    if (this.user.role !== "manager") {
      const tickets = data.filter(
        (ticket) => ticket.createBy === this.req.userId
      );

      pages = paginate(tickets);
      return this.res.json({
        data: pages[page - 1],
        meta: {
          current_page: page,
          total_pages: pages.length,
          total_items: tickets.length,
        },
      });
    }
    pages = paginate(data);
    return this.res.json({
      data: pages[page - 1],
      meta: {
        current_page: page,
        total_pages: pages.length,
        total_items: data.length,
      },
    });
  }

  async POST() {
    const { status, priority, name, description, assignBy, dueDate } =
      this.req.body;
    const createBy = this.req.userId;
    const createDate = new Date();

    const ticket = await TicketModel.add({
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
      return this.res.json({
        data: ticket,
      });
    }
    return this.res.sendStatus(500);
  }

  async PUT() {
    const { status, priority, name, description, assignBy, dueDate, id } =
      this.req.body;

    const ticket = await TicketModel.update({
      assignBy,
      description,
      dueDate,
      name,
      priority,
      status,
      id,
    });
    if (ticket) return this.res.json(ticket);
    return this.res.sendStatus(500);
  }

  async DELETE() {
    const id = this.req.path.split("/")[4];
    const ticket = TicketModel.delete(id);
    if (ticket) return this.res.json({ ticket });
    return this.res.sendStatus(404);
  }
}

module.exports = TicketController;
