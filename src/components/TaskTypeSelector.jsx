import React from 'react';
import './TaskTypeSelector.css';

const TaskTypeSelector = ({ taskType, onTaskTypeChange, isDisabled }) => {
    const tasks = [
        { value: 'snow', label: '❄️ Snow Removal', description: 'Snow covered areas' },
        { value: 'grass', label: '🌿 Lawn Mowing', description: 'Grass areas' },
        { value: 'auto', label: '🤖 Auto Detect', description: 'Automatic detection' }
    ];

    return (
        <div className="task-type-selector">
            <h3>Task Type</h3>
            <div className="task-buttons">
                {tasks.map(task => (
                    <button
                        key={task.value}
                        className={`task-btn ${taskType === task.value ? 'active' : ''}`}
                        onClick={() => onTaskTypeChange(task.value)}
                        disabled={isDisabled}
                    >
                        <div className="task-label">{task.label}</div>
                        <div className="task-description">{task.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskTypeSelector;