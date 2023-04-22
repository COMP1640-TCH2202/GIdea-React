import api from "../utils/api";

export const getAllUsers = async () => {
    return api.get("/api/users");
};

export const getUsersBy = (params) => {
    return api.get("/api/users", {params: params});
}

export const updateUser = async (id, request) => {
    api.put(`/api/users/${id}`, request);
}

export const getUserById = async (id) =>
    api.get(`/api/users/${id}`);

export const createUser = async (request) =>
    api.post("/api/users", request);

export const deleteUser = async (id) =>
    api.delete(`/api/users/${id}`);