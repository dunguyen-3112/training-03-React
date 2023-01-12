const crypto = require("crypto");

const length = 64; // 32 bytes = 64 hex characters

const hex = crypto.randomBytes(length).toString("hex");
console.log(hex);
