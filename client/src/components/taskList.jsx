import React from 'react';
import { Card, Form } from 'react-bootstrap';

const getOptions = (currentStatus) => {
    switch (currentStatus) {
        case 'not-started':
            return [
                { value: 'not-started', label: 'Not Started' },
                { value: 'in-progress', label: 'In Progress' }
            ];
        case 'in-progress':
            return [
                { value: 'not-started', label: 'Not Started' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' }
            ];
        case 'completed':
            return [
                { value: 'completed', label: 'Completed' }
            ];
        default:
            return [];
    }
};

const TaskList = ({ tasks, status, onStatusChange }) => {
    return (
        <>
            <h2>{status === 'not-started' ? 'Not Started' : 'In Progress'}</h2>
            <div className="d-grid gap-3">
                {tasks.filter(task => task.status === status).map(task => (
                    <Card key={task._id} className="task-card">
                        <Card.Body>
                            <div>{task.description}</div>
                            <Form.Select
                                value={task.status}
                                onChange={(e) => onStatusChange(task._id, e.target.value)}
                            >
                                {getOptions(task.status).map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Select>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default TaskList;