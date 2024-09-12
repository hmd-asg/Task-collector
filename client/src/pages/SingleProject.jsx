import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import { ASSIGN_PROJECT, UPDATE_PROJECT, ASSIGN_TASK } from "../utils/mutations";
import TaskForm from "../components/TaskForm";

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

  const [selectedTaskId, setSelectedTaskId] = useState(null); 
  const [selectedUserId, setSelectedUserId] = useState(""); 

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
    const username = formState.new_user;
    try {
      await assignProject({ variables: {username, projectId}});
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssignTask = async () => {
    try {
      await assignTask({
        variables: { userId: selectedUserId, task: selectedTaskId },
      });
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h3>Project Members</h3>
          {project.users.map(user => (
            <p key={user._id}>{user.username}</p>
          ))}
          <div className="mb-3">
            <textarea
              className="form-control"
              name="new_user"
              placeholder="Add new user"
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={handleAddUser}>
            Add member
          </button>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <textarea
              className="form-control"
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Project Title"
            ></textarea>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Project Description"
            ></textarea>
          </div>
          <button className="btn btn-success mb-4" onClick={handleUpdateProject}>
            Update Project
          </button>

          <div className="mb-4">
            <TaskForm />
          </div>

          <div>
            <h3>Assign Task:</h3>
            <div className="mb-3">
              <label>Select Task: </label>
              <select
                className="form-select"
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
            <div className="mb-3">
              <label>Assign to User: </label>
              <select
                className="form-select"
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
              className="btn btn-primary"
              onClick={handleAssignTask}
              disabled={!selectedTaskId || !selectedUserId}
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
