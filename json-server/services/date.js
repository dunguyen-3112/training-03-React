function getDateFormat(date) {
    const d1 = new Date(date);
    return `${d1.getFullYear().toString().padStart(4, '0')}-${d1
        .getMonth()
        .toString()
        .padStart(2, '0')}-${d1.getDate().toString().padStart(2, '0')}`;
}

// eslint-disable-next-line no-undef
module.exports = getDateFormat;
