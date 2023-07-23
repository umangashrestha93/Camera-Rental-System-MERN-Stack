import axios from "axios"
import Cookies from "universal-cookie";

import { normalizePayloadToFormData } from "../../utils/form";
import { normalizeCamera } from "../../components/camera/utils";

const cookies = new Cookies();
const adminToken = cookies.get("adminToken");

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
}

const headersForMultiPart = {
    "Content-Type": `multipart/form-data: boundary=add-random-characters`,
    "Authorization": `Bearer ${adminToken}`,
};

const BASE_URL = "http://localhost:8000/api";

//Auth
export const handleAdminLogin = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, payload);
        cookies.set("adminToken", response.data.token);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const handleLogOut = async (payload) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/logout`, { headers });
        cookies.remove("adminToken");
        return response;
    } catch (error) {
        console.error(error);
    }
}

//Orders
export const getOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/order`, { headers });
        return response;
    } catch (error) {
        console.error(error);
    }
}

//User Management
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`, { headers })
        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (id, payload) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`, payload, { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`, { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const createUser = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, payload)
        return response;
    } catch (error) {
        console.error(error);
    }
}

//Camera Management
export const getCameras = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/camera`)
        return response
    } catch (error) {
        console.error(error);
    }
}

export const getCamera = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/camera/${id}`, { headers })
        return response
    } catch (error) {
        console.error(error);
    }
}

export const createCamera = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/camera`, normalizeCamera(payload), { headers })
        const id = response.data.data._id;

        const uploadResponse = await uploadImageToCamera(id, payload);
        return uploadResponse;
    } catch (error) {
        console.error(error);
    }
}

export const uploadImageToCamera = async (id, payload) => {
    try {
        const formData = normalizePayloadToFormData({ file: payload.cover })
        const response = await axios.post(`${BASE_URL}/camera/upload/${id}`, formData, { headers: headersForMultiPart })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const updateCamera = async (id, payload) => {
    try {
        const response = await axios.put(`${BASE_URL}/camera/${id}`, normalizeCamera(payload), { headers })
        if (payload.cover[0] instanceof File) {
            const uploadResponse = await uploadImageToCamera(id, payload);
            return uploadResponse;
        }
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCamera = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/camera/${id}`, { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}
