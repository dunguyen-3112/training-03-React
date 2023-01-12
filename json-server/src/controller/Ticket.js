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
    let { _ticketId, _ticket_name } = this.req.query;
    _ticketId = _ticketId || this.req.path.split("/tickets/").at(1);
    const page = parseInt(this.req.query._page) || 1;

    let data;
    let pages;

    if (_ticketId) {
      data = await TicketModel.getById(_ticketId);
      if (data?.createBy === this.req.userId || this.user.role === "manager") {
        data = await this.combineDatas(data);
        return this.res.json(data);
      }

      return this.res.sendStatus(404);
    }
    if (_ticket_name) {
      const data = TicketsModel.tickets.filter((ticket) =>
        ticket.name.includes(_ticket_name),
      );
      return this.res.json(data);
    }

    data = await TicketsModel.getAll();
    if (this.user.role !== "manager") {
      const tickets = data.filter(
        (ticket) => ticket.createBy === this.req.userId,
      );
      pages = paginate(tickets);
      data = await this.combineDatas(pages[page - 1]);
      return this.res.json(data);
      // {
      //   data: data1,
      //    meta: {
      //      current_page: page,
      //      total_pages: pages.length,
      //      total_items: tickets.length,
      //    },
      //  }
    }
    pages = paginate(data);
    data = await this.combineDatas(pages[page - 1]);
    return this.res.json(data);
    // meta: {
    //   current_page: page,
    //   total_pages: pages.length,
    //   total_items: data.length,
    // },
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
      return this.res.json(ticket);
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
    const id = this.req.path.split("/").at(-1);
    const ticket = TicketModel.delete(id);
    if (ticket) {
      return this.res.json(ticket);
    }
    return this.res.sendStatus(404);
  }

  /**
   *
   * @param {<Array<Ticket>} data
   * @returns
   */
  async combineDatas(data) {
    const combineData = async (item) => {
      const user = await User.findUserById(item.assignBy);
      if (user === undefined) return;
      item = {
        ...item,
        customerAvatar: user.avatarUrl || "",
        customerName: `${user.firstName} ${user.lastName}`,
      };
      return item;
    };

    data =
      Array.from(data).length > 0
      ? (await Promise.all(data.map((item) => combineData(item)))).filter(
            (item) => item !== undefined,
          )
      : (data = combineData(data));
    return data;
  }
}

module.exports = TicketController;
