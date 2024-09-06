import { useQuery } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';

import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const projects = data?.meProjects.projects || [];
  // console.log(Auth.getProfile());
  console.log(data);

  return (
    <main>
      <div className='container'>
        <div className="row">
          <div className='col-12 col-md-5 border border-primary m-2'>
            <ProjectForm />
          </div>
          <div className='col-12 col-md-7 border border-primary m-2'>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ProjectList projects={projects} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
