// Divide Date.now() with a year
let years = Math.round(Date.now() / year);
const obj = { email: "huudu@gmail.com", password: "12345", date };
const jwt = require("jsonwebtoken");

const tk = jwt.sign(obj, "31122001");

console.log(tk);

console.log(jwt.verify(tk, "31122001"));
