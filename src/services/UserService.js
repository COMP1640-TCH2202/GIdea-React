import api from "../utils/api";

export const login = async (request) => {
    await api.get("/sanctum/csrf-cookie");

    // going for TOKEN based authentication method
    return api.post("/api/login", request);

    // going for COOKIE based authentication method
    // return api.post("/login", request);
};

export const getLoggedInUser = async (request) => {
    return api.get("/api/user");
};

export const logout = async () => {
    // going for TOKEN based authentication method
    return api.post("/api/logout");

    // going for COOKIE based authentication method
    // return api.post("/logout");
};

export const getUserSubmission = async () => {
    return api.get("/api/ideas/submissions");
}