const crypto = require("crypto");

function generateToken() {
  // Generate a random number
  let randomNumber = crypto.randomBytes(64).toString("hex");

  // Return the hexadecimal token
  return randomNumber;
}

let token = generateToken();

