import api from "../utils/api";
export const getAllDepartments = async () => {
    //this return a Promise
    return api.get("/api/departments");
};

export const createDepartment = async (request) =>
    api.post("/api/departments", request);

export const deleteDepartment = async (id) => 
    api.delete(`/api/departments/${id}`);

 export const getDetailDepartment = async (id) => {
     return api.get(`/api/departments/${id}`);
};
    


