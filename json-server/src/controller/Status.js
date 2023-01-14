/* eslint-disable no-undef */
const { STATUSES } = require("../config/constant");

class StatusController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  GET() {
    const data = STATUSES.map((item, index) => ({
      value: index + 1,
      text: item,
    }));
    return this.res.json(data);
  }
}

module.exports = StatusController;
