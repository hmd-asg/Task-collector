import { useQuery } from "@apollo/client";

import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";

import { QUERY_ME } from "../utils/queries";
import { QUERY_USERS } from "../utils/queries"

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const { loadingUsers, usersData } = useQuery(QUERY_USERS)
  const projects = data?.user.projects || [];
  const users = usersData?.users || [];


  return (
    <main>
      <div className='container p-3'>
        <div className="row">
          <div className='col-12 col-md-5 border border-primary'>
            <ProjectForm users={users} />
          </div>
          <div className='col-12 col-md-7 border border-primary'>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ProjectList projects={projects} title='Projects' />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
