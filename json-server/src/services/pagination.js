const { ITEMSPERPAGE } = require("../config/constant");

function paginate(data) {
  const pages = [];
  const totalItems = data.length;
  for (let i = 0; i < totalItems; i += ITEMSPERPAGE) {
    pages.push(data.slice(i, i + ITEMSPERPAGE));
  }
  return pages;
}

module.exports = paginate;
