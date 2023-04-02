import api from "../utils/api";
const basePath = "/api/ideas";

export const submitIdea = async (request) => {
    return api.post(basePath, request);
};

export const uploadDocuments = async (formData, idea_id) => {
    return api.post(`${basePath}/${idea_id}/documents`, formData);
};

export const getPaginatedIdeas = async (page = 1) => {
    return api.get(`${basePath}?page=${page}`);
};

export const getIdeaComments = async (idea_id) => {
    return api.get(`${basePath}/${idea_id}/comments`);
};

export const submitComment = async (request, idea_id) => {
    return api.post(`${basePath}/${idea_id}/comments`, request);
};

export const checkOwnership = async (idea_id) => {
    return api.get(`${basePath}/${idea_id}/ownership`);
};

export const getIdeaDetail = async (idea_id) => {
    return api.get(`${basePath}/${idea_id}`);
};

export const getIdeaDocuments = async (idea_id, document_slug) => {
    return api.get(`${basePath}/${idea_id}/documents/${document_slug}`);
};

export const updateIdea = async (request, idea_id) => {
    return api.put(`${basePath}/${idea_id}`, request);
};

export const voteIdea = async (request, idea_id) => {
    return api.put(`${basePath}/${idea_id}/vote`, request);
};

export const deleteIdea = async (idea_id) => {
    return api.delete(`${basePath}/${idea_id}`);
};
