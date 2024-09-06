import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";

const SingleProject = (project) => {
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: project._id },
  });

  const project = data?.project || {};
  const [formState, setFormState] = useState({
    title: project.title,
    description: project.description,
    users: project.users,
    tasks: project.tasks,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
const handleUpdateProject = () => {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='my-3'>
        <h4 className='card-header bg-dark text-light p-2 m-0'>
          {project.title}
        </h4>
        <div className='card-body bg-light p-2'>
          <textarea onChange={handleChange}>{project.description}</textarea>
          <Button onClick={handleUpdateProject}>Update Project</Button>
        </div>

        {/* <div className='my-5'>
          <CommentList comments={monster.comments} monsterId={monster._id} />
        </div>
        <div className='m-3 p-4' style={{ border: "1px dotted #1a1a1a" }}>
          <CommentForm monsterId={monster._id} />
        </div> */}
      </div>

      {/* <Modal
        show={showUpdateMonsterModal}
        onHide={handleCloseUpdateMonsterModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Monster</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateMonsterForm
            monsterId={monster._id}
            initialMonsterData={monster}
            handleCloseUpdateMonsterModal={handleCloseUpdateMonsterModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUpdateMonsterModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default SingleProject;