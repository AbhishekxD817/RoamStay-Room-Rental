import api from "./api";

export const signup = async (data) => {
    try {
        let response = await api.post("/auth/signup", data);
        return response;
    } catch (error) {
        console.log(error)
        console.log("Error => " + error);
        return;
    }
}
export const login = async (data) => {
    try {
        let response = await api.post("/auth/login", data);
        return response;
    } catch (error) {
        console.log(error)
        console.log("Error => " + error);
        return;
    }
}
export const logout = async () => {
    try {
        let response = await api.post("/auth/logout");
        return response;
    } catch (error) {
        console.log(error)
        console.log("Error => " + error);
        return;
    }
}

export const isAuthenticated = async () => {
    try {
        let response = await api.get("/auth");
        return response;
    } catch (error) {
        console.log(error)
        console.log("Error => " + error);
        return;
    }
}