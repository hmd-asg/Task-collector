import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <>

      <div className='card col-12 col-md-6 mx-2 my-2'>
        <h4 className='card-header text-light p-2 m-0'>
          {project.title}
        </h4>
        <div className='card-body bg-light p-2'>
          <p>{project.description}</p>
          {/* <h5>Contributers:</h5>
              <ul>
                {project.users.map((user) => (
                  <li key={user._id}>{user.username}</li>
                ))}
              </ul> */}
        </div>
        <div className="card-footer d-flex">
          <button type="button" className="btn btn-danger me-2"><i className="bi bi-trash"></i>Delete</button>
          <Link
            className='btn btn-primary'
            to={`/project/${project._id}`}
          >
            View more
          </Link>
        </div>

      </div>
    </>
  );
};

export default ProjectCard;
