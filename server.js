/* eslint-disable no-undef */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');

const db = require('./db.json');
const fileName = './db.json';

const PORT = process.env.PORT || 3000;

const server = jsonServer.create();
const router = jsonServer.router(fileName);
const middlewares = jsonServer.defaults();

let refreshTokens = [];

server.use(middlewares);

server.use(
    jsonServer.rewriter({
        '/api/users': '/users',
    })
);

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    try {
        const urls = req.path.split('/');

        const url = urls[1];

        if (url == 'login') handleLogin(req, res);
        // refresh token
        else if (url == 'token') {
            const { token } = req.body;

            if (!refreshTokens.includes(token)) return res.sendStatus(403);

            jwt.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, { id, role }) => {
                    if (err) return res.sendStatus(403);
                    const access_token = generateAccessToken({
                        id,
                        role,
                    });
                    res.json({
                        access_token,
                    });
                }
            );
        }
        //
        else if (
            req.method == 'GET' &&
            (url === 'statuses' || url === 'priorities')
        )
            authenticateToken(req, res) == true && next();
        else {
            authenticateToken(req, res) == true &&
                navigationRole(req, res, next);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

server.use(router);

server.listen(PORT, () => {
    console.log('JSON Server is running on port ' + PORT);
});

function handleLogin(req, res) {
    const { email, password } = req.body;
    let user = db.users.find((user) => user.email === email);

    if (user?.password === password) {
        const access_token = generateAccessToken({
            id: user.id,
            role: user.role,
        });
        const refresh_token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.REFRESH_TOKEN_SECRET
        );
        refreshTokens.push(refresh_token);

        res.json({
            status: 200,
            message: 'Login successful!',
            access_token,
            refresh_token,
        });
    } else
        res.json({
            status: 401,
            message: 'Login failed! You please check email or password ?',
        });
}
function authenticateToken(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, { id, role }) => {
        if (err) return res.sendStatus(403);
        req.userId = id;
        req.userRole = role;
    });
    return true;
}

function navigationRole(req, res, next) {
    const role = req.userRole;

    const url = req.path.split('/')[1];
    const method = req.method;

    let obj;

    let id = req.query.id || req.path.split('/')[2];

    const date_regex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (url === 'tickets' && (method === 'PUT' || method === 'POST')) {
        const status = req.body.status;
        const priority = req.body.priority;
        const name = req.body.name;
        const description = req.body.description;
        const assignBy = req.body.assignBy;
        const dueDate = req.body.dueDate;

        if (
            typeof status !== 'number' ||
            status > 4 ||
            status < 0 ||
            typeof priority !== 'number' ||
            priority < 0 ||
            priority > 3 ||
            name === undefined ||
            typeof name !== 'string' ||
            name.trim().length <= 0 ||
            description === undefined ||
            typeof description !== 'string' ||
            description.trim().length <= 0 ||
            assignBy === undefined ||
            typeof assignBy !== 'string' ||
            assignBy.trim().length <= 0 ||
            dueDate === undefined ||
            typeof dueDate !== 'string' ||
            dueDate.trim().length <= 0 ||
            !date_regex.test(dueDate) ||
            new Date(dueDate).toString() === 'Invalid Date' ||
            new Date(dueDate).getTime() < new Date().getTime()
        )
            return res.sendStatus(400);

        if (method === 'PUT') {
            obj = db.tickets.find((ticket) => ticket.id === id);

            if (
                JSON.stringify(obj) ===
                JSON.stringify({
                    ...req.body,
                    id,
                    createDate: obj.createDate,
                    createBy: obj.createBy,
                })
            ) {
                return res.sendStatus(202);
            }

            if (
                new Date(dueDate).toString() === 'Invalid Date' ||
                new Date(dueDate).getTime() < new Date(obj.createDate).getTime()
            )
                return res.sendStatus(400);

            if (obj == null) return res.sendStatus(400);

            Object.assign(req.body, {
                id,
                ...obj,
                ...req.body,
            });
        } else if (method === 'POST') {
            const date = new Date();
            Object.assign(req.body, {
                ...req.body,
                createDate: `${date.getDate()}/${date.getMonth() + 1}/${
                    date.getFullYear() + 1
                }`,
                createBy: req.userId,
            });
        }
    }

    let resObj;

    switch (role) {
        case 'manager':
            next();
            break;
        case 'developer':
            switch (url) {
                case 'tickets':
                    switch (method) {
                        case 'GET':
                            resObj = id
                                ? db.tickets.find((ticket) => ticket.id === id)
                                : db.tickets.filter(
                                      (ticket) => ticket.createBy === req.userId
                                  );

                            if (id && resObj.createBy !== req.userId)
                                return res.sendStatus(403);

                            return resObj == null || resObj == []
                                ? res.sendStatus(404)
                                : res.json({
                                      body: resObj,
                                      status: 200,
                                      message: '',
                                  });

                        case 'POST':
                            next();
                            break;

                        case 'DELETE':
                            resObj = db.tickets.find(
                                (ticket1) => ticket1.id === id
                            );

                            if (resObj == null) return res.sendStatus(400);
                            if (resObj.createBy !== req.userId)
                                return res.sendStatus(403);
                            next();
                            break;
                        case 'PUT':
                            if (req.body.createBy !== req.userId)
                                return res.sendStatus(403);
                            next();
                            break;
                        default:
                            res.sendStatus(404);
                            break;
                    }
                    break;

                default:
                    res.send(404);
                    break;
            }
            break;
        default:
            res.sendStatus(404);
            break;
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
    });
}
