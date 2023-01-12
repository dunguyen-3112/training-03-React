const crypto = require('crypto');

function generateToken() {
  // Generate a random number
  const randomNumber = crypto.randomBytes(64).toString('hex');

  // Return the hexadecimal token
  return randomNumber;
}

const token = generateToken();
