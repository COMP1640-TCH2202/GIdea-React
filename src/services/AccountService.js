import api from "../utils/api";

export const getAllUsers = async () => {
    return api.get("/api/users");
};

export const getUsersBy = (params) => {
    return api.get("/api/users", {params: params});
}

export const updateUser = async (id, request) => {
    return api.put(`/api/users/${id}`, request);
}

export const getUserById = async (id) => {
    return api.get(`/api/users/${id}`);
}

export const createUser = async (request) => {
    return api.post("/api/users", request);
}

export const deleteUser = async (id) => {
    return api.delete(`/api/users/${id}`);
}