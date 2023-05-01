export const setCurrentUser = (user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("current-user"));
};

export const clearUser = () => {
    localStorage.clear();
};

export const numFormatter = (number) => {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
};

export const dateFormatter = (date, locale, options) => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

export const timesAgoFormatter = (date) => {
    const formatter = new Intl.RelativeTimeFormat(`en`, { style: `narrow`, });
    const secondsAgo = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(secondsAgo / 31536000);
    if (interval > 1) {
        return formatter.format(interval * -1, 'year')
    }

    interval = Math.floor(secondsAgo / 2592000);
    if (interval > 1) {
        return formatter.format(interval * -1, 'month')
    }

    interval = Math.floor(secondsAgo / 86400);
    if (interval > 1) {
        return formatter.format(interval * -1, 'day')
    }

    interval = Math.floor(secondsAgo / 3600);
    if (interval > 1) {
        return formatter.format(interval * -1, 'hour')
    }

    interval = Math.floor(secondsAgo / 60);
    if (interval > 1) {
        return formatter.format(interval * -1, 'minute')
    }

    if (secondsAgo < 10) return "just now";

    return formatter.format(secondsAgo * -1, 'second')
};

export const isSameStrings = (strA, strB) => {
    return strA.localeCompare(strB, 'en', { sensitivity: 'base' }) === 0
}