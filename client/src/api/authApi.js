import api from "./api";
import { toast } from 'react-toastify';

export const signup = async (data) => {
    try {
        let response = await api.post("/auth/signup", data);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;
    }
}
export const login = async (data) => {
    try {
        let response = await api.post("/auth/login", data);
        return response;
    } catch (error) {
        const { message = "Error" } = error.response.data;
        // console.log(error)
        toast.error(message);
        return;
    }
}
export const logout = async () => {
    try {
        let response = await api.post("/auth/logout");
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;
    }
}
export const isAuthenticated = async () => {
    try {
        let response = await api.get("/auth");
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;
    }
}