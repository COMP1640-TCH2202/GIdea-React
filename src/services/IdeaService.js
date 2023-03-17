import api from "../utils/api";

export const submitIdea = async (request) => {
    return api.post("/api/ideas", request);
}

export const getPaginatedIdeas = async (page = 1) => {
    return api.get(`/api/ideas?page=${page}`)
}