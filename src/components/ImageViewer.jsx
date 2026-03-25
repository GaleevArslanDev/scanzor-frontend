import React, { useState } from 'react';
import './ImageViewer.css';

const ImageViewer = ({ originalUrl, processedUrl, fileType }) => {
    const [activeTab, setActiveTab] = useState('original');

    if (!originalUrl && !processedUrl) {
        return (
            <div className="image-viewer empty">
                <p>No media loaded</p>
            </div>
        );
    }

    return (
        <div className="image-viewer">
            <div className="viewer-tabs">
                <button
                    className={`tab ${activeTab === 'original' ? 'active' : ''}`}
                    onClick={() => setActiveTab('original')}
                >
                    Original
                </button>
                <button
                    className={`tab ${activeTab === 'processed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('processed')}
                >
                    Segmented Result
                </button>
            </div>

            <div className="viewer-content">
                {activeTab === 'original' && originalUrl && (
                    fileType === 'video' ? (
                        <video src={originalUrl} controls className="media-preview" />
                    ) : (
                        <img src={originalUrl} alt="Original" className="media-preview" />
                    )
                )}

                {activeTab === 'processed' && processedUrl && (
                    <img src={processedUrl} alt="Processed" className="media-preview" />
                )}

                {activeTab === 'processed' && !processedUrl && (
                    <div className="no-processed">
                        <p>Processed image not available yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageViewer;