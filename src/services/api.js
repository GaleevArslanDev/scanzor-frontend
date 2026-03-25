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

export const analyzeImage = async (file, calibration, taskType = 'auto') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('calibration', JSON.stringify(calibration));
    formData.append('task_type', taskType);

    const response = await apiClient.post(API_ENDPOINTS.ANALYZE_IMAGE, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    // Обрабатываем маску из ответа
    const data = response.data;
    if (data.mask) {
        // Маска уже в формате data:image/png;base64,...
        data.processedImageUrl = data.mask; // Для совместимости с существующим кодом

        // Создаем наложенное изображение, если нужно
        if (data.mask && file) {
            data.overlayImageUrl = await createOverlayImage(file, data.mask);
        }
    }

    return data;
};

// Функция для создания наложенного изображения
const createOverlayImage = async (originalFile, maskDataUrl) => {
    return new Promise((resolve, reject) => {
        const originalImg = new Image();
        const maskImg = new Image();

        originalImg.onload = () => {
            maskImg.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = originalImg.width;
                canvas.height = originalImg.height;
                const ctx = canvas.getContext('2d');

                // Рисуем оригинальное изображение
                ctx.drawImage(originalImg, 0, 0);

                // Рисуем маску с прозрачностью
                ctx.globalAlpha = 0.5;
                ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1.0;

                resolve(canvas.toDataURL());
            };
            maskImg.onerror = reject;
            maskImg.src = maskDataUrl;
        };
        originalImg.onerror = reject;
        originalImg.src = URL.createObjectURL(originalFile);
    });
};

export const checkHealth = async () => {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    return response.data;
};

export default apiClient;