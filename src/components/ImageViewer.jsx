import React, { useState } from 'react';
import './ImageViewer.css';

const ImageViewer = ({ originalUrl, processedUrl, overlayUrl, maskUrl, fileType }) => {
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
                    className={`tab ${activeTab === 'overlay' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overlay')}
                >
                    Overlay (Mask on Image)
                </button>
                <button
                    className={`tab ${activeTab === 'mask' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mask')}
                >
                    Mask Only
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

                {activeTab === 'overlay' && overlayUrl && (
                    <img src={overlayUrl} alt="Overlay" className="media-preview" />
                )}

                {activeTab === 'mask' && processedUrl && (
                    <img src={processedUrl} alt="Mask" className="media-preview" />
                )}

                {activeTab === 'overlay' && !overlayUrl && (
                    <div className="no-processed">
                        <p>Overlay image not available yet</p>
                    </div>
                )}

                {activeTab === 'mask' && !processedUrl && (
                    <div className="no-processed">
                        <p>Mask not available yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageViewer;