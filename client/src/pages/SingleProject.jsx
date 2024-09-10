import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import { ASSIGN_PROJECT, UPDATE_PROJECT } from "../utils/mutations";
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

  const [updateProject, { error }] = useMutation(UPDATE_PROJECT);
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

        {/* Include TaskForm here */}
        <div className="my-5">
          <TaskForm />
        </div>
      </div>
    </>
  );
};

export default SingleProject;
