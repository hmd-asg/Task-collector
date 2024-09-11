import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import { ASSIGN_PROJECT, UPDATE_PROJECT, ASSIGN_TASK } from "../utils/mutations";
import TaskForm from "../components/TaskForm";
import { Button } from "react-bootstrap";

const SingleProject = () => {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

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
    setFormState({
      title: project.title,
      description: project.description,
      users: project.users,
      tasks: project.tasks,
    });
  }, [data]);

  const [updateProject, { error }] = useMutation(UPDATE_PROJECT);
  const [assignTask, { e }] = useMutation(ASSIGN_TASK);
  const [assignProject, { err }] = useMutation(ASSIGN_PROJECT, {
    refetchQueries: [{query: QUERY_SINGLE_PROJECT}],
  });

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
  const handleAddUser = async (event) => {
    event.preventDefault();
    console.log(formState);
    const username = formState.new_user;
    try {
      await assignProject({ variables: {username, projectId}});
    } catch (err) {
      console.log(err);
    }
  };


  const handleAssignTask = async () => {
    try {
      console.log(selectedTaskId);
      console.log(selectedUserId);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="my-3">
        <h3>Project Members</h3>
        {project.users.map( user => <p key={user._id}>{user.username}</p>)}
        <textarea
          className="card-body bg-light"
          name="new_user"
          placeholder="Add new user"
          onChange={handleChange}
        >
        </textarea>
        <Button onClick={handleAddUser}>Add member</Button>
      </div>
      <div className='my-3'>
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
              {project.tasks.map((task) => (
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
              {project.users.map((user) => (
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
