import api from "../utils/api";

export const login = async (request) => {
    await api.get("/sanctum/csrf-cookie");
    // return api.post("/api/login", request);

    // going for cookie based authentication endpoint
    return api.post("/login", request);
};

export const getLoggedInUser = async (request) => {
    return api.get("/api/user");
};

export const logout = async () => {
    // return api.post("/api/logout");
    return api.post("/logout");
};

export const getUserSubmission = async () => {
    return api.get("/api/ideas/submissions");
}