import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/config';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 120000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

// Тут можно отлавливать ошибки
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export const analyzeImage = async (file, calibration) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('calibration', JSON.stringify(calibration));

    const response = await apiClient.post(API_ENDPOINTS.ANALYZE_IMAGE, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const checkHealth = async () => {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    return response.data;
};

export default apiClient;