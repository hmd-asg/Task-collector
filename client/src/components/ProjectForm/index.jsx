import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJETCS } from "../../utils/queries";

const ProjectForm = () => {
  const [formState, setFormState] = useState({ title: "", description: "" });
  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [QUERY_PROJETCS, "getProjects"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addProject({
        variables: { ...formState },
      });
      console.log(data);
      setFormState({
        title: "",
        description: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };


  return (
    <>
      <h3>Add Project : </h3>

      <form
        className='flex-row justify-center justify-space-between-md align-center'
        onSubmit={handleFormSubmit}
      >
        <input type='text' placeholder='Enter a Project title'
          value={formState.title} onChange={handleChange} />

        <textarea
          name='monsterName'
          placeholder="Enter A project description"
          value={formState.description}
          className='form-input w-100'
          style={{ lineHeight: "1.5", resize: "vertical" }}
          onChange={handleChange}
        ></textarea>


        <div className='col-12 col-lg-3'>
          <button className='btn btn-primary btn-block py-3' type='submit'>
            Add Project
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

export default ProjectForm;
