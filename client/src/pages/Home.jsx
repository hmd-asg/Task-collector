import { useQuery } from "@apollo/client";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import { QUERY_ME } from "../utils/queries";
import { useEffect } from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const projects = data?.me?.projects || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="row">
      <div className='col-12 col-md-3 '>
        <ProjectForm />
      </div>
      <div className='row col-12 col-md-9 border border-dark ms-2'>
        {loading ? (<div>Loading...</div>) : (
          projects &&
          projects.map((project) => (<ProjectCard key={project._id} project={project} />))

        )}
      </div>
    </div>
  );
};

export default Home;
