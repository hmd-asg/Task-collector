import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROJECT, QUERY_USERS } from "../utils/queries";
import { UPDATE_PROJECT, ASSIGN_TASK } from "../utils/mutations";
import TaskForm from "../components/TaskForm";

const SingleProject = () => {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const { data: usersData, loading: usersLoading } = useQuery(QUERY_USERS); // Fetch all users
  const users = usersData?.users || [];

  const project = data?.project || {};

  const [formState, setFormState] = useState({
    title: project.title || "",
    description: project.description || "",
    users: project.users || [],
    tasks: project.tasks || [],
  });

  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track selected task
  const [selectedUserId, setSelectedUserId] = useState(""); // Track selected user

  useEffect(() => {
    if (data) {
      setFormState({
        title: project.title || "",
        description: project.description || "",
        users: project.users || [],
        tasks: project.tasks || [],
      });
    }
  }, [data]);

  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [assignTask] = useMutation(ASSIGN_TASK);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();
    const { title, description } = formState;
    try {
      const newProject = await updateProject({
        variables: { projectId, title, description },
      });
      console.log(newProject);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignTask = async () => {
    try {
      await assignTask({
        variables: { userId: selectedUserId, task: selectedTaskId },
      });
      console.log("Task assigned successfully");
      setSelectedTaskId(null);
      setSelectedUserId("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || usersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="my-3">
        <textarea
          className="card-header bg-dark text-light p-2 m-0"
          name="title"
          value={formState.title}
          onChange={handleChange}
        ></textarea>
        <div className="card-body bg-light p-2">
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
          ></textarea>
          <button onClick={handleUpdateProject}>Update Project</button>
        </div>

        <div className="my-5">
          <TaskForm />
        </div>

        <div className="my-5">
          <h3>Assign Task:</h3>
          <div>
            <label htmlFor="task-select">Select Task: </label>
            <select
              id="task-select"
              value={selectedTaskId || ""}
              onChange={(e) => setSelectedTaskId(e.target.value)}
            >
              <option value="">Select a task</option>
              {formState.tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="user-select">Assign to User: </label>
            <select
              id="user-select"
              value={selectedUserId || ""}
              onChange={(e) => setSelectedUserId(e.target.value)}
              disabled={!selectedTaskId}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAssignTask}
            disabled={!selectedTaskId || !selectedUserId}
          >
            Assign Task
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
