/* eslint-disable no-undef */
const fs = require('fs');

function saveChanges(json) {
    fs.writeFileSync('db.json', JSON.stringify(json));
}

module.exports = saveChanges;
