import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { ADD_TASK } from "../utils/mutations";

const TaskForm = () => {
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("not started");
    const [addTask, { error }] = useMutation(ADD_TASK);
    const { projectId } = useParams();
    const [formError, setFormError] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (description.trim() === "") {
            setFormError("Description cannot be empty.");
            return;
        }

        try {
            setFormError(""); 
            const { data } = await addTask({
                variables: { projectId, description, status },
            });
            console.log(data);
            setDescription("");
            setStatus("not started");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='py-3'>
            <h3>Add Task:</h3>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="taskDescription">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter a task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="taskStatus">
                    <Form.Control
                        as="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                    </Form.Control>
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit" 
                    className="mt-3"
                    disabled={description.trim() === ""} 
                >
                    Add Task
                </Button>
                {formError && (
                    <Alert variant='danger' className='mt-3'>
                        {formError}
                    </Alert>
                )}
                {error && (
                    <Alert variant='danger' className='mt-3'>
                        {error.message}
                    </Alert>
                )}
            </Form>
        </div>
    );
};

export default TaskForm;

