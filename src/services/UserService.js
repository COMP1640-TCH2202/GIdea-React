import api from "../utils/api";

export const login = async (request) => {
    let data;
    await api.post("/login", request).then((res) => {
        data = res;
    }).catch((err) => {
        return err;
    });
    return data;

    // const csrf = await api.get("/sanctum/csrf-cookie");
    // console.log("csrf: ", csrf);
    // return api.post("/api/login", request);
};

export const getLoggedInUser = async (request) => {
    return api.get("/api/user");
};

export const logout = async () => {
    return api.post("/api/logout");
};
