/* eslint-disable no-undef */
const { PRIORITIES } = require("../config/constant");

class PriorityController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  GET() {
    const data = PRIORITIES.map((item, index) => ({
      value: index + 1,
      text: item,
    }));
    return this.res.json(data);
  }
}

module.exports = PriorityController;
