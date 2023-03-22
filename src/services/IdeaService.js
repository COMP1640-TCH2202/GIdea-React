import api from "../utils/api";

export const submitIdea = async (request) => {
    return api.post("/api/ideas", request);
};

export const getPaginatedIdeas = async (page = 1) => {
    return api.get(`/api/ideas?page=${page}`);
};

export const getIdeaComments = async (idea_id) => {
    return api.get(`/api/ideas/${idea_id}/comments`);
};

export const submitComment = async (request, idea_id) => {
    return api.post(`/api/ideas/${idea_id}/comments`, request);
};
