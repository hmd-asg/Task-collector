import { useMutation, useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import { UPDATE_PROJECT } from "../utils/mutations";
const SingleProject = () => {
  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};
  console.log(data);
  const [formState, setFormState] = useState({
    title: project.title,
    description: project.description,
    users: project.users,
    tasks: project.tasks,
  });
  useEffect(() => {
    setFormState({
      title: project.title,
    description: project.description,
    users: project.users,
    tasks: project.tasks,
    })
  }, [projectId]);
  const [updateProject, { error }] = useMutation(UPDATE_PROJECT)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
const handleUpdateProject = async (event) => {
  event.preventDefault();
  console.log(formState);
  const title = formState.title;
  const description = formState.description;
  try {
    const newProject = await updateProject({ variables: {projectId, title, description}});
    console.log(newProject);
  } catch (err) {
    console.error(err);
  }
};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='my-3'>
        <textarea name="title" className='card-header bg-dark text-light p-2 m-0' onChange={handleChange} value={`${formState.title}`}>
        </textarea>
        <div className='card-body bg-light p-2'>
          <textarea name="description" onChange={handleChange} value={`${formState.description}`}></textarea>
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