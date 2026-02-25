import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const inferMeasurements = async (imageFile, height, weight) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (height) formData.append('height', height);
    if (weight) formData.append('weight', weight);

    try {
        const response = await apiClient.post('/infer', formData);
        return response.data;
    } catch (error) {
        console.error('Error inferring measurements:', error);
        throw error;
    }
};

export default {
    inferMeasurements,
};
