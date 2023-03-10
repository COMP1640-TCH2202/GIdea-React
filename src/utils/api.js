import axios from "axios";
import { clearUser } from "./common";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json"
    },
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        switch (error.response.status) {
            case 401: // Not logged in
            case 419: // Session expired
            case 503: // Down for maintenance
                // Bounce the user to the login screen with a redirect back
                alert("Your session has expired, you will be logged out.");
                break;
            case 500:
                alert("Oops, something went wrong!");
                break;
            default:
                // Allow individual requests to handle other errors
                return Promise.reject(error);
        }
        clearUser();
        window.location.href = "/login";
    }
);

export default instance;
