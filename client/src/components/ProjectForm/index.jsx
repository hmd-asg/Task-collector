import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const ProjectForm = ({ users }) => {
  const [formState, setFormState] = useState({ title: "", description: "" });
  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    refetchQueries: [QUERY_ME, "getProjects"],
  });
  const [contributors, setContributors] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addProject({
        variables: { ...formState, contributors },
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

  const handleCheckboxChange = (username) => {
    setContributors((prevContributor) =>
      prevContributor.includes(username)
        ? prevContributor.filter((user) => user !== username)
        : [...prevContributor, username]
    );
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

        <div>
          <p>Select Contributors:</p>
          {users.map((user) => (
            <label key={user._id}>
              <input
                type="checkbox"
                checked={contributors.includes(user.username)}
                onChange={() => handleCheckboxChange(user.username)}
              />
              {username}
            </label>
          ))}
        </div>


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
