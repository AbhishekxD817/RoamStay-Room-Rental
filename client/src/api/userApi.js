import { toast } from "react-toastify";
import api from "./api.js";



export const fetchUserDetails = async () =>{
    try {
        const res = await api.get('/users');
        return res;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;
    }
}