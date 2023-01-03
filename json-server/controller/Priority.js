/* eslint-disable no-undef */
const { priorities } = require('../config/constant');

class PriorityController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    GET() {
        return this.res.json({ data: priorities });
    }
}

module.exports = PriorityController;
