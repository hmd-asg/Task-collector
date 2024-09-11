import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, UPDATE_TASK } from "../utils/queries";
import TaskList from '../components/taskList';

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
        <div>
            <div>Welcome to the Task Zone!</div>
            <div>
                <TaskList
                    tasks={tasks}
                    status="not started"
                    onStatusChange={handleStatusChange}
                />
                <TaskList
                    tasks={tasks}
                    status="in progress"
                    onStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default Tasks;
