import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', status: 'in-progress' },
        { id: 2, text: 'Task 2', status: 'completed' },
    ]);

    const toggleTaskStatus = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId
                ? { ...task, status: task.status === 'in-progress' ? 'completed' : 'in-progress' }
                : task
        ));
    };

    const addTask = () => {
        const taskText = prompt('Enter task description:');
        if (taskText) {
            setTasks([...tasks, { id: Date.now(), text: taskText, status: 'in-progress' }]);
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <Button variant="primary" onClick={addTask}>Add Task</Button>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>In Progress</h2>
                    <div className="d-grid gap-3">
                        {tasks.filter(task => task.status === 'in-progress').map(task => (
                            <Card key={task.id} className="task-card" onClick={() => toggleTaskStatus(task.id)}>
                                <Card.Body>{task.text}</Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col md={6}>
                    <h2>Completed</h2>
                    <div className="d-grid gap-3">
                        {tasks.filter(task => task.status === 'completed').map(task => (
                            <Card key={task.id} className="task-card" onClick={() => toggleTaskStatus(task.id)}>
                                <Card.Body>{task.text}</Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;