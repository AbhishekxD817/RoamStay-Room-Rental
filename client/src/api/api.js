import axios from "axios";

const api = axios.create({
    baseURL:"https://roamstay-room-rental.onrender.com",
    withCredentials:true
})

export default api;