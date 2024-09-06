import { useQuery } from "@apollo/client";

import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";

import { QUERY_ME } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const projects = data?.user.projects || [];



  return (
    <main>
      <div className='container p-3'>
        <div className="row">
          <div className='col-12 col-md-5 border border-primary'>
            <ProjectForm />
          </div>
          <div className='col-12 col-md-7 border border-primary'>
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
