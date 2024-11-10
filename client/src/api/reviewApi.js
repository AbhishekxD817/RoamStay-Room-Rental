import { toast } from "react-toastify";
import api from "./api.js";

export const createReview = async (lid, data) => {
    try {
        let response = await api.post(`/listings/${lid}/reviews`, data);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

export const updateReview = async (lid, rid, data) => {
    try {
        let response = await api.put(`/listings/${lid}/reviews/${rid}`, data);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}

export const deleteReview = async (lid, rid) => {
    try {
        let response = await api.delete(`/listings/${lid}/reviews/${rid}`);
        return response;
    } catch (error) {
        const { message = "Error" } = error;
        toast.error(message);
        return;

    }
}