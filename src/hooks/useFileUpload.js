import { useState, useCallback } from 'react';
import { analyzeImage } from '../services/api';
import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from '../constants/config';

export const useFileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [imageDimensions, setImageDimensions] = useState(null);

    const validateFile = useCallback((file) => {
        if (!file) {
            throw new Error('No file selected');
        }

        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
        }

        const isImage = SUPPORTED_FORMATS.image.includes(file.type);

        if (!isImage) {
            throw new Error('Unsupported file format. Please upload JPEG or PNG files');
        }

        return isImage;
    }, []);

    // Функция для получения размеров изображения
    const getImageDimensions = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                });
                URL.revokeObjectURL(img.src);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }, []);

    const uploadFile = useCallback(async (file, calibration, taskType = 'auto') => {
        try {
            setError(null);
            setProgress(0);
            setIsLoading(true);

            const isImage = validateFile(file);

            // Получаем реальные размеры изображения
            const dimensions = await getImageDimensions(file);
            setImageDimensions(dimensions);

            // Обновляем калибровку с реальной шириной изображения
            const updatedCalibration = {
                ...calibration,
                imageWidth: dimensions.width  // ← автоматически подставляем реальную ширину
            };

            let response;
            if (isImage) {
                response = await analyzeImage(file, updatedCalibration, taskType);
                setFileType('image');
            }

            setResult(response);
            setProgress(100);
            return response;
        } catch (err) {
            setError(err.message || 'An error occurred during file processing');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [validateFile, getImageDimensions]);

    const reset = useCallback(() => {
        setFile(null);
        setFileType(null);
        setIsLoading(false);
        setProgress(0);
        setResult(null);
        setError(null);
        setImageDimensions(null);
    }, []);

    return {
        file,
        fileType,
        isLoading,
        progress,
        result,
        error,
        imageDimensions,
        uploadFile,
        reset,
        setFile
    };
};