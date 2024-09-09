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
    <div className='color-change-5x'>
      <h3>Add Project :</h3>
      <form className='py-2' onSubmit={handleFormSubmit}>
        <input
          type='text'
          name="title"
          className='form-input w-100'
          placeholder='Enter a Project title'
          value={formState.title}
          onChange={handleChange}
        />
        <textarea
          name='description'
          placeholder="Enter A project description"
          value={formState.description}
          className='form-input w-100 mt-4'
          style={{ lineHeight: "3.5", resize: "vertical" }}
          onChange={handleChange}
        ></textarea>
        <div className='col-12 col-lg-6'>
          <button className='btn btn-primary my-3' type='submit'>
            Save
          </button>
        </div>

        {error && (
          <div className='col-12 my-3 bg-danger text-white p-3'>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProjectForm;
