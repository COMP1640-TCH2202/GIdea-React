import api from "../utils/api";

export const submitIdea = async (request) => {
    return api.post("/api/ideas", request);
}