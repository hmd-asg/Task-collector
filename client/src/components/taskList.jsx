import React from 'react';

const getOptions = (currentStatus) => {
    const allOptions = [
        { value: 'not started', label: 'Not Started' },
        { value: 'in progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
    ];

    if (currentStatus === 'in progress') {
        return allOptions;
    }

    if (currentStatus === 'completed') {
        return [{ value: 'completed', label: 'Completed' }];
    }

    return allOptions.filter(option => option.value !== 'completed');
};

const TaskList = ({ tasks, status, onStatusChange }) => {
    return (
        <>
            <h2>{status === 'not started' ? 'Not Started' : 'In Progress'}</h2>
            <div>
                {tasks.filter(task => task.status === status).map(task => (
                    <div key={task._id}>
                        <div>{task.description}</div>
                        <select
                            value={task.status}
                            onChange={(e) => onStatusChange(task._id, e.target.value)}
                        >
                            {getOptions(task.status).map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TaskList;
