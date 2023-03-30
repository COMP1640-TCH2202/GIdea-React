import api from "../utils/api";

export const getAllUsers = async () => {
    //this return a Promise
    return api.get("/api/users");
};
export const updateUser = async (id, request) => {
    api.put(`/api/users/${id}`, request);
}
export const getUserById = async (id) =>
    api.get(`/api/users/${id}`);

export const createUser = async (request) =>
    api.post("/api/users", request);

export const deleteUser = async (id) =>
    api.delete(`/api/users/${id}`);