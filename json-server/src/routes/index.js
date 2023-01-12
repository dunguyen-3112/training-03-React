/* eslint-disable no-undef */
const TicketController = require('../controller/Ticket');
const LoginController = require('../controller/Login');
const PriorityController = require('../controller/Priority');
const StatusController = require('../controller/Status');
const UserController = require('../controller/User');

function routes(req, res) {
  const route = req.path.split('/')[3];

  let ctrl;
  const { method } = req;

  switch (route) {
    case 'tickets':
      ctrl = new TicketController(req, res);
      break;
    case 'token':
    case 'login':
    case 'logout':
      ctrl = new LoginController(req, res);
      break;
    case 'statuses':
      ctrl = new StatusController(req, res);
      break;
    case 'priorities':
      ctrl = new PriorityController(req, res);
      break;
    case 'users':
      ctrl = new UserController(req, res);
      break;

    default:
      res.sendStatus(404);
      break;
  }

  if (ctrl !== undefined) {
    switch (method) {
      case 'GET':
        ctrl.GET();
        break;
      case 'POST':
        ctrl.POST();
        break;
      case 'PUT':
        ctrl.PUT();
        break;
      case 'DELETE':
        ctrl.DELETE();
        break;

      default:
        res.sendStatus(404);
        break;
    }
  }
}

module.exports = routes;
