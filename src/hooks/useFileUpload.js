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

    const uploadFile = useCallback(async (file, calibration) => {
        try {
            setError(null);
            setProgress(0);
            setIsLoading(true);

            const isImage = validateFile(file);

            let response;
            if (isImage) {
                response = await analyzeImage(file, calibration);
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
    }, [validateFile]);

    const reset = useCallback(() => {
        setFile(null);
        setFileType(null);
        setIsLoading(false);
        setProgress(0);
        setResult(null);
        setError(null);
    }, []);

    return {
        file,
        fileType,
        isLoading,
        progress,
        result,
        error,
        uploadFile,
        reset,
        setFile
    };
};