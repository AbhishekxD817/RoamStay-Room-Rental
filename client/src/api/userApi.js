import api from "./api.js";



export const fetchUserDetails = async () =>{
    try {
        const res = await api.get('/users');
        return res;
    } catch (error) {
        console.log(error);
        return;
    }
}