import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, UPDATE_TASK } from "../utils/queries";
import TaskList from '../components/taskList';
import { Container, Row, Col } from 'react-bootstrap';


const Tasks = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const [updateTask] = useMutation(UPDATE_TASK);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const tasks = data?.me.tasks || [];

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTask({
                variables: { taskId, status: newStatus },
                update: (cache, { data: { updateTask } }) => {
                    const { me } = cache.readQuery({ query: QUERY_ME });
                    cache.writeQuery({
                        query: QUERY_ME,
                        data: {
                            me: {
                                ...me,
                                tasks: me.tasks.map(task =>
                                    task._id === taskId ? { ...task, status: newStatus } : task
                                )
                            }
                        }
                    });
                }
            });
        } catch (e) {
            console.error("Error updating task status", e);
        }
    };

    return (
        <Container>

            <Row>
                <Col md={6}>
                    <TaskList
                        tasks={tasks.filter(task => task.status === "not started")}
                        status="not started"
                        onStatusChange={handleStatusChange}
                    />
                </Col>
                <Col md={6}>
                    <TaskList
                        tasks={tasks.filter(task => task.status === "in progress")}
                        status="in progress"
                        onStatusChange={handleStatusChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Tasks;