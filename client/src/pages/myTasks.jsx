import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QUERY_ME, UPDATE_TASK_STATUS } from "../utils/queries";
import TaskList from '../components/taskList';

const Tasks = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
console.log(data);
    const tasks = data?.me.tasks || [];
console.log(tasks);
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTaskStatus({ 
                variables: { id: taskId, status: newStatus }
            });
        } catch (e) {
            console.error("Error updating task status", e);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <TaskList tasks={tasks} status="not started" onStatusChange={handleStatusChange} />
                </Col>
                <Col md={6}>
                    <TaskList tasks={tasks} status="in progress" onStatusChange={handleStatusChange} />
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;