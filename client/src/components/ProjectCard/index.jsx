import { Link } from "react-router-dom";

import { REMOVE_PROJECT } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";

const ProjectCard = ({ project }) => {
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);
  const handleDelete = async () => {
    try {
      console.log(project._id);
      const deletedProject = await removeProject({ variables: { projectId: project._id } });
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <>

      <div className='card col-12 col-md-5 p-0 mx-2 my-2'>
        <h4 className='card-header p-2 m-0'>
          {project.title}
        </h4>
        <div className='card-body bg-light p-2'>
          <p>{project.description}</p>
          <h5>Contributers:</h5>
          <ul>
            {project.users.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="card-footer d-flex">
          <button type="button" className="btn btn-danger me-2" onClick={handleDelete}><i className="bi bi-trash"></i> Delete</button>

          <Link
            className='btn btn-primary'
            to={`/project/${project._id}`}
          >
            <i className="bi bi-info-circle"></i> Details
          </Link>
        </div>

      </div>
    </>
  );
};

export default ProjectCard;
