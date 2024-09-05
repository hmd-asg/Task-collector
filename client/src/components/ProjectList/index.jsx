import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  if (!projects.length) {
    return <h3>No Project Yet</h3>;
  }
  console.log(projects);
  return (
    <>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className='cardcol-12 col-md-6 mx-2 my-2'>
            <h4 className='card-header  bg-dark text-light p-2 m-0'>
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
              <button type="button" class="btn btn-primary"><i class="bi bi-plus"></i>Edit</button>
              <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i>Delete</button>
              <Link
                className='btn btn-primary btn-block btn-squared'
                to={`/project/${project._id}`}
              >
                View more
              </Link>
            </div>

          </div>
        ))}
    </>
  );
};

export default ProjectList;
