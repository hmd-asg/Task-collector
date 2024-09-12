import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
  user(username: $username) {
    username
    email
    _id
    projects {
      description
      title
    }
    tasks {
      description
      status
    }
  }
}
`;
export const QUERY_USERS = gql`
  query users {
    user{
      _id
      username
    }
  }
`;

export const QUERY_ME = gql`

  query me {
    me {
      _id
      username
      email
      projects {
        title
        description
        _id
        users {
          _id
          username
        }
      }
      tasks {
        _id
        description
        status
      }
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectId: ID!) {
      project(projectId: $projectId) {
    _id
    description
    tasks {
      _id
      description
      status
    }
    title
    users {
      _id
      email
      username
    }
  }
}
`;
export const UPDATE_TASK = gql`
  mutation updateTask($taskId: ID!, $description: String, $status: String) {
    updateTask(taskId: $taskId, description: $description, status: $status) {
      _id
      description
      status
    }
  }
`;


