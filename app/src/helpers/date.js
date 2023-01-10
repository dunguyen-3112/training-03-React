export function getDateISOSString(date) {
    date = new Date(date);
    return date.toISOString().substring(0, 10);
}

export function getDateFormat(date) {
    date = new Date(date);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function getTimeString(date) {
    date = new Date(date);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export function getTimeAgo(date) {
    date = new Date(date);
    const timeInMilliseconds = date.getTime();
    const seconds = Math.floor((new Date() - timeInMilliseconds) / 1000);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);
    if (days === 0) {
        return "Today";
    } else if (days === 1) {
        return "Yesterday";
    }
    return `${days} days ago`;
}

export function getDateTimeString(date) {
    return `${getDateTimeString(date)} ${getTimeString(date)}`;
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
