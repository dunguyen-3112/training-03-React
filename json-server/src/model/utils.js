const fs = require("fs");
const crypto = require("crypto");

function generateToken() {
  const randomNumber = crypto.randomBytes(64).toString("hex");
  return randomNumber;
}

function saveChanges(json) {
  fs.writeFileSync("src/data/db.json", JSON.stringify(json));
}

module.exports = saveChanges;
