import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ progress, message }) => {
    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <div className="spinner"></div>
                <p className="loading-message">{message || 'Processing...'}</p>
                {progress > 0 && progress < 100 && (
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        <span className="progress-text">{progress}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoadingOverlay;