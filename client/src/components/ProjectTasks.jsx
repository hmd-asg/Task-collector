import React from 'react';
import { Card, Form } from 'react-bootstrap';

const ProjectTasks = ({ tasks, onStatusChange }) => {
    return (
        <>
            <div className="d-grid gap-3">
                {tasks.map(task => (
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

export default ProjectTasks;