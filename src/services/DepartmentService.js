import api from "../utils/api";

const basePath = "/api/departments";

export const getAllDepartments = async () => {
    return api.get(`${basePath}`);
};
export const updateDepartment = async (id, request) => {
    return api.put(`${basePath}/${id}`, request);
};

export const getDepartmentDetail = async (id) => {
    return api.get(`${basePath}/${id}`);
};

export const createDepartment = async (request) => {
    return api.post(`${basePath}`, request);
};

export const deleteDepartment = async (id) => {
    return api.delete(`${basePath}/${id}`);
};

export const addMember = async (id, request) => {
    return api.put(`${basePath}/${id}/add`, request);
};

export const removeMemberFromDepartment = async (memberId) => {
    return api.delete(`${basePath}/remove/${memberId}`);
};
