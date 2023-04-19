import api from "../utils/api";
const basePath = "/api/stats";

export const getIdeasByDepartment = async () => {
    return api.get(`${basePath}/ideas-by-dept`);
};

export const getMostUsedCategories = async () => {
    return api.get(`${basePath}/most-used-categories`);
};

export const getIdeasByDays = async () => {
    return api.get(`${basePath}/ideas-by-days`);
};

export const getIdeasFact = async () => {
    return api.get(`${basePath}/ideas-facts`);
};
