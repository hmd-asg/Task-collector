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
    <div className="row">
      <div className='col-12 col-md-3 p-5'>
        <ProjectForm />
      </div>
      <div className='row justify-content-evenly col-12 col-md-9 border border-dark ms-2'>
        {loading ? (<div>Loading...</div>) : (
          projects &&
          projects.map((project) => (<ProjectCard key={project._id} project={project} />))

        )}
      </div>
    </div>
  );
};

export default Home;
