import api from "../utils/api";

export const getAllUsers = async () => {
    //this return a Promise
    return api.get("/api/users");
};

export const createUser = async (request) =>
    api.post("/api/users", request);

export const deleteUser = async (id) => 
    api.delete(`/api/users/${id}`);