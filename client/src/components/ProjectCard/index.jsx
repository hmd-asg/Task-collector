import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div>
      <h4>{project.title}</h4>
      <div>
        <p>{project.description}</p>
        <h5>Contributors:</h5>
        <ul>
          {project.users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <button>Delete</button>
        <Link to={`/project/${project._id}`}>Details</Link>
      </div>
    </div>
  );
};

export default ProjectCard;
