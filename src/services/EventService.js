import api from "../utils/api";
const basePath = "/api/events";

export const getAllEvents = async () => {
    return api.get(basePath);
};

export const getCurrentEvent = async () => {
    return api.get(`${basePath}/current`);
};

export const createEvent = async (request) => {
    return api.post(basePath, request);
};
