import React from 'react';
import './ResultCard.css';

const ResultCard = ({ result }) => {
    if (!result) return null;

    const formatArea = (area) => {
        if (area >= 10000) {
            return `${(area / 10000).toFixed(2)} hectares`;
        }
        return `${area.toFixed(2)} m²`;
    };

    const getWorkTypeLabel = (type) => {
        return type === 'snow' ? 'Snow Removal' : 'Lawn Mowing';
    };

    return (
        <div className="result-card">
            <h3>Analysis Results</h3>

            <div className="result-main">
                <div className="result-area">
                    <div className="area-value">{formatArea(result.processedArea)}</div>
                    <div className="area-label">Processed Area</div>
                </div>

                <div className="result-stats">
                    <div className="stat">
                        <span className="stat-label">Work Type:</span>
                        <span className="stat-value">{getWorkTypeLabel(result.workType)}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Confidence:</span>
                        <span className="stat-value">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Pixel Count:</span>
                        <span className="stat-value">{result.processedPixels.toLocaleString()} px</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Pixel to m² Ratio:</span>
                        <span className="stat-value">{result.pixelToMeterRatio.toFixed(2)} px/m²</span>
                    </div>
                </div>
            </div>

            {result.estimatedDuration && (
                <div className="result-duration">
                    <span>Estimated Duration:</span>
                    <strong>{result.estimatedDuration.toFixed(1)} hours</strong>
                </div>
            )}

            {result.metadata && (
                <div className="result-metadata">
                    <details>
                        <summary>Processing Details</summary>
                        <div className="metadata-content">
                            <p>Processing Time: {result.metadata.processingTime}ms</p>
                            <p>Segmentation Model: {result.metadata.modelVersion}</p>
                            <p>Calibration Method: {result.metadata.calibrationMethod}</p>
                        </div>
                    </details>
                </div>
            )}
        </div>
    );
};

export default ResultCard;