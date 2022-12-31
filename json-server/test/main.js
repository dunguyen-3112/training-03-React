// eslint-disable-next-line no-undef
const Ticket = require('../model/Ticket');

const ticket = new Ticket({
    id: '656565',
    name: 'huu du',
    assignBy: 'ddd',
    createBy: 'N974MRn',
    createDate: new Date('2022-3-1'),
    description: 'g565g5g',
    priority: 'High',
    status: 'Done',
    dueDate: new Date('2022-4-1'),
});

console.log(ticket.validate());
