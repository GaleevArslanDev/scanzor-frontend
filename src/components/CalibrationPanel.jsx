import React, { useState, useEffect } from 'react';
import './CalibrationPanel.css';

const CalibrationPanel = ({ onCalibrationChange, initialCalibration }) => {
    const [calibration, setCalibration] = useState({
        focalLength: initialCalibration?.focalLength || 35,
        mountHeight: initialCalibration?.mountHeight || 5,
        tiltAngle: initialCalibration?.tiltAngle || 90,
        sensorWidth: initialCalibration?.sensorWidth || 36
    });

    const handleChange = (field, value) => {
        const newCalibration = { ...calibration, [field]: parseFloat(value) || 0 };
        setCalibration(newCalibration);
        onCalibrationChange(newCalibration);
    };

    return (
        <div className="calibration-panel">
            <h3>Camera Calibration Parameters</h3>
            <div className="calibration-grid">
                <div className="param-group">
                    <label>Focal Length (mm)</label>
                    <input
                        type="number"
                        value={calibration.focalLength}
                        onChange={(e) => handleChange('focalLength', e.target.value)}
                        step="1"
                        min="10"
                        max="200"
                    />
                    <small>Camera focal length in millimeters</small>
                </div>

                <div className="param-group">
                    <label>Mount Height (m)</label>
                    <input
                        type="number"
                        value={calibration.mountHeight}
                        onChange={(e) => handleChange('mountHeight', e.target.value)}
                        step="0.1"
                        min="1"
                        max="50"
                    />
                    <small>Height of camera above ground</small>
                </div>

                <div className="param-group">
                    <label>Tilt Angle (degrees)</label>
                    <input
                        type="number"
                        value={calibration.tiltAngle}
                        onChange={(e) => handleChange('tiltAngle', e.target.value)}
                        step="1"
                        min="0"
                        max="180"
                    />
                    <small>Camera angle relative to ground</small>
                </div>

                <div className="param-group">
                    <label>Sensor Width (mm)</label>
                    <input
                        type="number"
                        value={calibration.sensorWidth}
                        onChange={(e) => handleChange('sensorWidth', e.target.value)}
                        step="1"
                        min="10"
                        max="50"
                    />
                    <small>Camera sensor width</small>
                </div>
            </div>
        </div>
    );
};

export default CalibrationPanel;