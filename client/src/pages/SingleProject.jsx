import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_PROJECT, QUERY_ME } from "../utils/queries";
import { UPDATE_PROJECT } from "../utils/mutations";
import TaskForm from "../components/TaskForm";

const SingleProject = () => {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};
  const [formState, setFormState] = useState({
    title: project.title,
    description: project.description,
    users: project.users,
    tasks: project.tasks,
  });

  // Using useEffect to update formState when project data is loaded
  useEffect(() => {
    setFormState({
      title: project.title,
      description: project.description,
      users: project.users,
      tasks: project.tasks,
    });
  }, [data]);
  
  const [updateProject] = useMutation(UPDATE_PROJECT);

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

  if (loading) {
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

        {/* Include TaskForm here */}
        <div className="my-5">
          <TaskForm />
        </div>
      </div>
    </>
  );
};

export default SingleProject;
