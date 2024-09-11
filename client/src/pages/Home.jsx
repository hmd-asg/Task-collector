import { useQuery } from "@apollo/client";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { QUERY_ME } from "../utils/queries";
import { useEffect } from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations.js"



const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const projects = data?.me?.projects || [];
  // const [removeProject, { error }] = useMutation(REMOVE_PROJECT, { refetchQueries: { query: QUERY_ME } });
  // const deleteProject = async (id) => {
  //   try {
  //     const deletedProject = await removeProject({ variables: { projectId: id } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    }

  }, [projects]);

  return (
    <div>
      <div>Welcome to the Dashboard, the epicenter of your productivity universe! Here’s where the magic happens—create new projects, manage your existing ones, or explore the menus above to find even more awesome features. Your next great achievement is just a click away. Ready to make things happen? Let’s get started!</div>
      <div>
        <ProjectForm />
      </div>
      <div>
        {loading ? (<div>Loading...</div>) : (
          projects &&
          projects.map((project) => (<ProjectCard key={project._id} project={project} />))
        )}
      </div>
    </div>
  );
};

export default Home;
