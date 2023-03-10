import api from "../utils/api";

export const getAllCategories = async () => {
    //this return a Promise
    return api.get("/api/categories");
};

export const createCategory = async (request) =>
    api.post("/api/categories", request);
