export const setCurrentUser = (user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("current-user"));
};

export const clearUser = () => {
    localStorage.clear();
};
