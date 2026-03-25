import React, { useState, useCallback } from 'react';
import FileUploader from './components/FileUploader';
import CalibrationPanel from './components/CalibrationPanel';
import ImageViewer from './components/ImageViewer';
import ResultCard from './components/ResultCard';
import LoadingOverlay from './components/LoadingOverlay';
import { useFileUpload } from './hooks/useFileUpload';
import './App.css';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [calibration, setCalibration] = useState({
        focalLength: 35,
        mountHeight: 5,
        tiltAngle: 90,
        sensorWidth: 36,
        imageWidth: 1920
    });

    const {
        isLoading,
        progress,
        result,
        error,
        uploadFile,
        reset
    } = useFileUpload();

    const handleFileSelect = useCallback((file) => {
        setSelectedFile(file);
        // Clear previous results when new file is selected
        if (result) {
            reset();
        }
    }, [result, reset]);

    const handleAnalyze = useCallback(async () => {
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }

        try {
            await uploadFile(selectedFile, calibration);
        } catch (err) {
            console.error('Analysis failed:', err);
        }
    }, [selectedFile, calibration, uploadFile]);

    const handleCalibrationChange = useCallback((newCalibration) => {
        setCalibration(newCalibration);
    }, []);

    const handleReset = useCallback(() => {
        reset();
        setSelectedFile(null);
    }, [reset]);

    // Create object URLs for preview
    const originalUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;
    const processedUrl = result?.processedImageUrl || null;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Work Area Analyzer</h1>
                <p>Automated analysis of snow removal and lawn mowing areas</p>
            </header>

            <main className="App-main">
                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                        <button onClick={() => window.location.reload()} className="error-close">
                            ×
                        </button>
                    </div>
                )}

                <div className="upload-section">
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        isDisabled={isLoading}
                    />

                    {selectedFile && !isLoading && (
                        <div className="action-buttons">
                            <button onClick={handleAnalyze} className="btn-primary">
                                Analyze Area
                            </button>
                            <button onClick={handleReset} className="btn-secondary">
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                <div className="calibration-section">
                    <CalibrationPanel
                        onCalibrationChange={handleCalibrationChange}
                        initialCalibration={calibration}
                    />
                </div>

                {(originalUrl || processedUrl) && (
                    <div className="visualization-section">
                        <ImageViewer
                            originalUrl={originalUrl}
                            processedUrl={processedUrl}
                            fileType={selectedFile?.type?.startsWith('video/') ? 'video' : 'image'}
                        />
                    </div>
                )}

                {result && (
                    <div className="results-section">
                        <ResultCard result={result} />
                    </div>
                )}
            </main>

            {isLoading && (
                <LoadingOverlay
                    progress={progress}
                    message="Analyzing work area..."
                />
            )}
        </div>
    );
}

export default App;