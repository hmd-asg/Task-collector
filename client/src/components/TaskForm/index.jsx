import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { ADD_TASK } from "../../utils/mutations";

const TaskForm = () => {

    const [description, setDescription] = useState("");
    const [addTask, { error }] = useMutation(ADD_TASK);
    const { projectId } = useParams();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addTask({
                variables: { projectId, description },
            });
            console.log(data);
            setDescription("");
        } catch (err) {
            console.error(err);
        }
    };



    return (
        <>
            <h3>Add Task : </h3>

            <form
                className='py-2'
                onSubmit={handleFormSubmit}
            >

                <textarea
                    name='description'
                    placeholder="Enter A Task description"
                    value={description}
                    className='form-input w-100'
                    style={{ lineHeight: "1.5", resize: "vertical" }}
                    onChange={(e) => setDescription(description)}
                ></textarea>

                <div className='col-12 col-lg-3'>
                    <button className='btn btn-primary btn-block py-3' type='submit'>
                        Add Task
                    </button>
                </div>
                {error && (
                    <div className='col-12 my-3 bg-danger text-white p-3'>
                        {error.message}
                    </div>
                )}
            </form>
        </>
    );
};

export default TaskForm;
