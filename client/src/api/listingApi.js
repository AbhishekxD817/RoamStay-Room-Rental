import api from "./api";
import { toast } from "react-toastify";



export const getAllListings = async () => {
    try {
        let response = await api.get("/listings");
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

export const createListing = async (data) => {
    try {
        let response = await api.post("/listings",data);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

export const showListing = async (id) => {
    try {
        let response = await api.get(`/listings/${id}`);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

export const updateListing = async (id,data) => {
    try {
        let response = await api.put(`/listings/${id}`,data);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

export const deleteListing = async (id) => {
    try {
        let response = await api.delete(`/listings/${id}`);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

