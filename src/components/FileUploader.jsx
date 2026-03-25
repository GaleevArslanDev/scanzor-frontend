import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css';

const FileUploader = ({ onFileSelect, isDisabled }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        disabled: isDisabled,
        maxFiles: 1
    });

    return (
        <div
            {...getRootProps()}
            className={`file-uploader ${isDragActive ? 'drag-active' : ''} ${isDisabled ? 'disabled' : ''}`}
        >
            <input {...getInputProps()} />
            <div className="uploader-content">
                <div className="upload-icon">📸</div>
                <h3>Upload Photo</h3>
                <p>Drag & drop or click to select</p>
                <small>Supported formats: JPG, PNG (Max 10MB)</small>
            </div>
        </div>
    );
};

export default FileUploader;