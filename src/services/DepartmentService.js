import api from "../utils/api";

export const getAllDepartments = async () => {
    return api.get("/api/departments");
};
export const updateDepartment = async (id, request) => {
    api.put(`/api/departments/${id}`, request);
}
export const getDepartmentDetail = async (id) =>
    api.get(`/api/departments/${id}`);

export const createDepartment = async (request) =>
    api.post("/api/departments", request);

export const deleteDepartment = async (id) =>
api.delete(`/api/departments/${id}`);