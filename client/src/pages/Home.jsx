import { useQuery } from "@apollo/client";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/taskList";
import { QUERY_ME } from "../utils/queries";
import { useEffect } from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const projects = data?.me?.projects || [];
  const tasks = data?.me?.tasks || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    }
  }, [projects, tasks]);

  return (
    <div className="wrapper">
      <div className="section" data-background-color="transparent">
        <h1 className="title">Welcome to the Dashboard</h1>
        <p>Your next great achievement is just a click away. Ready to make things happen? Let’s get started!</p>
      </div>

      <div className="section" data-background-color="#3498db">
        <h2 className="title">Projects</h2>
        <ProjectForm />
        <div className="project-list">
          {loading ? (
            <div>Loading...</div>
          ) : (
            projects.map((project) => <ProjectCard key={project._id} project={project} />)
          )}
        </div>
      </div>

      <div className="section" data-background-color="#27ae60">
        <h2 className="title">Tasks</h2>
        <TaskForm />
        <div className="task-list">
          <TaskList tasks={tasks} status="not started" />
          <TaskList tasks={tasks} status="in progress" />
        </div>
      </div>

      <div className="section" data-background-color="#e74c3c">
        <h2 className="title">Profile</h2>
        <p>Your profile details and settings will be here.</p>
      </div>
    </div>
  );
};

export default Home;
