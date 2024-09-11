import { Link } from "react-router-dom";
import { REMOVE_PROJECT } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import './ProjectCard.css'; // Import the new CSS file

const ProjectCard = ({ project }) => {
  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);

  const handleDelete = async () => {
    try {
      const deletedProject = await removeProject({ variables: { projectId: project._id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="project-card">
      <h4>{project.title}</h4>
      <div className="project-details">
        <p>{project.description}</p>
        <h5>Contributors:</h5>
        <ul>
          {project.users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div className="project-actions">
        <button type="button" onClick={handleDelete}><i className="bi bi-trash"></i> Delete</button>
        <Link to={`/project/${project._id}`}><i className="bi bi-info-circle"></i> Details</Link>
      </div>
    </div>
  );
};

export default ProjectCard;
