import { apiClient } from "./apiClient";

const shortner = async(data) => {
    try {
        console.log(data)
        const response = await apiClient.post('/api/v1/shortner', data );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Something went wrong during post shortner request";
    }
}



export {
    shortner,
}