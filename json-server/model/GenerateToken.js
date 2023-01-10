const crypto = require("crypto");

function generateToken() {
  // Generate a random number
  let randomNumber = crypto.randomBytes(64).toString("hex");

  // Return the hexadecimal token
  return randomNumber;
}

let token = generateToken();

console.log(token);
// Output: a random hexadecimal string, such as '8d9dbf5a84bfceaa6f5f6b5a17b55ce7'
