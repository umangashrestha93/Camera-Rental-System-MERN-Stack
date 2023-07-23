import axios from "axios"
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

export const emptyDefaultValues = {
    email: '',
    role: '',
    username: '',
};

export const normalizeProfile = (info) => {
    const data = { ...info };

    Object.keys(data).forEach((key) => {
        if (typeof emptyDefaultValues?.[key] === "undefined") {
            delete data[key];
        }
    });

    return data;
};

export const getProfile = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/auth/me", { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const updateProfile = async (payload) => {
    try {
        const response = await axios.put("http://localhost:8000/api/auth/updatedetails", payload, { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const updatePassword = async (payload) => {
    try {
        const response = await axios.put("http://localhost:8000/api/auth/updatepassword", payload, { headers })
        return response;
    } catch (error) {
        console.error(error);
    }
}
