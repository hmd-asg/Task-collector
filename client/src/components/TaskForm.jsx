import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
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
      setDescription("");
      setStatus("not started");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Add Task:</h3>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Enter a task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
        </select>
        <button type="submit" disabled={description.trim() === ""}>
          Add Task
        </button>
        {formError && <div>{formError}</div>}
        {error && <div>{error.message}</div>}
      </form>
    </div>
  );
};

export default TaskForm;
