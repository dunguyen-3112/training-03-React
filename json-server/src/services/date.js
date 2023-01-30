function getDateFormat(date) {
  const d1 = new Date(date);
  return `${d1.getFullYear().toString().padStart(4, "0")}-${d1
    .getMonth()
    .toString()
    .padStart(2, "0")}-${d1.getDate().toString().padStart(2, "0")}`;
}

function compareDate(date1, date2) {
  const isCompare = new Date(date1).getTime() - new Date(date2).getTime();
  return isCompare;
}


// eslint-disable-next-line no-undef
module.exports = {getDateFormat, compareDate};
