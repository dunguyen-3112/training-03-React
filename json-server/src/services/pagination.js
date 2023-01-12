const { itemsPerPage } = require("../config/constant");

function paginate(data) {
  const pages = [];
  const totalItems = data.length;
  for (let i = 0; i < totalItems; i += itemsPerPage) {
    pages.push(data.slice(i, i + itemsPerPage));
  }
  return pages;
}

module.exports = paginate;
