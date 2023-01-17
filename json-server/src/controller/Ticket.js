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
    this.user = await this.modelUser.findUserById(this.req.userId);
    let { _ticket_id, _query, _page, status, priority } = this.req.query;
    _ticket_id = _ticket_id || this.req.path.split("/tickets/").at(1);
    const page = parseInt(_page) || 1;

    let data;
    let pages;

    if (_ticket_id) {
      data = await this.modelTicket.getById(_ticket_id);
      if (data?.createBy === this.req.userId || this.user.role === "manager") {
        data = await this.combineDatas(data);
        return this.res.json(data);
      }

      return this.res.sendStatus(403);
    }
    if (_query) {
      const data = this.modelTicket.tickets.filter((ticket) =>
        stringsoSlug(ticket.name).includes(stringsoSlug(_query)),
      );
      const temp = await Promise.all(
        data.map(async ({ id, name, assignBy }) => {
          const user = await this.modelUser.findUserById(assignBy);
          return { id, name, avatar: user?.avatarUrl };
        }),
      );
      return this.res.json(temp);
    }

    data = await this.modelTicket.getAll();

    if (status) {
      status = parseInt(status, 10);
      data = data.filter((ticket) => ticket.status === status);
    }

    if (priority) {
      priority = parseInt(priority, 10);
      data = data.filter((ticket) => ticket.priority === priority);
    }

    const total_items = data.length;
    if (this.user.role !== "manager") {
      const tickets = data.filter(
        (ticket) => ticket.createBy === this.req.userId,
      );
      pages = paginate(tickets);
      data = await this.combineDatas(pages[page - 1]);
      return this.res.json({
        data: data,
        meta: {
          current_page: page,
          total_pages: pages.length,
          total_items: tickets.length,
        },
      });
    }
    pages = paginate(data);
    data = await this.combineDatas(pages[page - 1]);
    return this.res.json({
      data: data,
      meta: {
        current_page: page,
        total_pages: pages.length,
        total_items: total_items,
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
    let ticket = await this.modelTicket.update({
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
    const ticket = this.modelTicket.delete(id);
    if (ticket) {
      return this.res.json(ticket);
    }
    return this.res.sendStatus(404);
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
