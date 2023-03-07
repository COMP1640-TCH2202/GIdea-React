import api from "../utils/api";

export const getAllCategories = async () => {
    //this return a Promise
    return api.get("/api/categories");
};
