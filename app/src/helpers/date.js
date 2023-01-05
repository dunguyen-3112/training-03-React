export function getDateString(date) {
    return date.toISOString().substring(0, 10);
}

export function getTimeString(date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

export function getDateTimeString(date) {
    return `${getDateString(date)} ${getTimeString(date)}`;
}

export function isValidDate(dateString) {
    return !isNaN(new Date(dateString).getTime());
}

export function isValidTime(timeString) {
    const timeRegex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    return timeRegex.test(timeString);
}

export function isValidDateTime(dateTimeString) {
    const [dateString, timeString] = dateTimeString.split(" ");
    return isValidDate(dateString) && isValidTime(timeString);
}
