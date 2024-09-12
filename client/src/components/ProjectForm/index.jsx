import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const ProjectForm = () => {
  const [formState, setFormState] = useState({ title: "", description: "" });
  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProject({
        variables: { ...formState },
      });
      setFormState({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <h3>Add Project:</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter a Project title"
          value={formState.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Enter a project description"
          value={formState.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Save</button>
        {error && <div>{error.message}</div>}
      </form>
    </div>
  );
};

export default ProjectForm;
