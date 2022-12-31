/* eslint-disable no-undef */
const { statuses } = require("../config/constant");

class StatusController{
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    GET(){
        return this.res.json({data: statuses});
    }
}

module.exports = StatusController;
