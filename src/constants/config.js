export const API_BASE_URL = 'http://localhost:8000/api';  // здесь будет ссылка на апи

export const API_ENDPOINTS = {
    ANALYZE_IMAGE: '/analyze/image',
    ANALYZE_VIDEO: '/analyze/video',
    CALIBRATE: '/calibrate',
    HEALTH: '/health'
};

export const SUPPORTED_FORMATS = {
    image: ['image/jpeg', 'image/png', 'image/jpg'],
};

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB