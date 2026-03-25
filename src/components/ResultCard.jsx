import React from 'react';
import './ResultCard.css';

const ResultCard = ({ result, imageDimensions }) => {
    if (!result) return null;

    const formatArea = (area) => {
        if (area >= 10000) {
            return `${(area / 10000).toFixed(2)} hectares`;
        }
        return `${area.toFixed(2)} m²`;
    };

    const getWorkTypeLabel = (type) => {
        switch(type) {
            case 'snow':
                return '❄️ Snow Removal';
            case 'grass':
                return '🌿 Lawn Mowing';
            default:
                return '🤖 Auto Detected';
        }
    };

    return (
        <div className="result-card">
            <h3>Analysis Results</h3>

            <div className="result-main">
                <div className="result-area">
                    <div className="area-value">{formatArea(result.total_area_sqm)}</div>
                    <div className="area-label">Total Processed Area</div>
                </div>

                <div className="result-stats">
                    <div className="stat">
                        <span className="stat-label">Task Type:</span>
                        <span className="stat-value">{getWorkTypeLabel(result.task_type)}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Processed:</span>
                        <span className="stat-value">{result.processed_percentage?.toFixed(1)}%</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Pixels Processed:</span>
                        <span className="stat-value">{result.processed_pixels?.toLocaleString()} / {result.total_pixels?.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {imageDimensions && (
                <div className="result-metadata">
                    <details>
                        <summary>Image Information</summary>
                        <div className="metadata-content">
                            <p>Image Dimensions: {imageDimensions.width} x {imageDimensions.height} px</p>
                            <p>Total Pixels: {(imageDimensions.width * imageDimensions.height).toLocaleString()} px</p>
                        </div>
                    </details>
                </div>
            )}

            {result.calibration_used && (
                <div className="result-metadata">
                    <details>
                        <summary>Calibration Details</summary>
                        <div className="metadata-content">
                            <p>Focal Length: {result.calibration_used.focalLength} mm</p>
                            <p>Mount Height: {result.calibration_used.mountHeight} m</p>
                            <p>Tilt Angle: {result.calibration_used.tiltAngle}°</p>
                            <p>Sensor Width: {result.calibration_used.sensorWidth} mm</p>
                            <p>Image Width: {result.calibration_used.imageWidth} px</p>
                        </div>
                    </details>
                </div>
            )}
        </div>
    );
};

export default ResultCard;