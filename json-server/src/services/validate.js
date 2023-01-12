/* eslint-disable no-undef */
const getDateFormat = require("./date");

function isValidDate(dateString) {
  dateString = getDateFormat(dateString);
  const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
  const dateArray = dateString.match(pattern);
  if (dateArray === null) {
    return false;
  }
  // const year = dateArray[1];
  // const month = dateArray[2];
  // const day = dateArray[3];
  // const date = new Date(year, month - 1, day);
  const isDateValid = true;
  return isDateValid;
}

function isValidEmail(email) {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email);
}

// eslint-disable-next-line no-undef
module.exports = { isValidDate, isValidEmail };
