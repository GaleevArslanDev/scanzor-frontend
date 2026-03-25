export const API_BASE_URL = 'https://scanzor-backend.onrender.com';  // здесь будет ссылка на апи

export const API_ENDPOINTS = {
    ANALYZE_IMAGE: '/analyze/image',
    HEALTH: '/health'
};

export const SUPPORTED_FORMATS = {
    image: ['image/jpeg', 'image/png', 'image/jpg'],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 500MB