import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
 mutation addProject($title: String!, $description: String) {
  addProject(title: $title, description: $description) {
    users {
      _id
    }
    title
    description
  }
}
`;

export const ADD_TASK = gql`

  mutation addTask($projectId: ID!, $description: String!) {
  addTask(projectId: $projectId, description: $description) {
    _id
    tasks {
      _id
    }
  }
}
`;

export const ASSIGN_TASK = gql`
  mutation assignTask($userId: ID!, $task: ID!) {
    assignTask(userId: $userId, task: $task) {
      username
      tasks {
        _id
      }
      _id
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
  removeProject(projectId: $projectId) {
    _id
    description
    tasks {
      description
      status
    }
  }
}
`;

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: ID!) {
  removeTask(taskId: $taskId) {
    description
    status
    _id
  }
}
`;

export const UPDATE_TASK = gql`
mutation updateTask($taskId: ID!, $description: String, $status: String) {
  updateTask(taskId: $taskId, description: $description, status: $status) {
    description
    status
    _id
  }
}
`;
export const ASSIGN_PROJECT = gql`
  mutation assignProject($username: String!, $projectId: ID!) {
  assignProject(username: $username, projectId: $projectId) {
    _id
    title
    description
    users {
      username
      _id
    }
  }
}
`;
export const UPDATE_PROJECT = gql`
  mutation updateProject($projectId: ID!, $title: String, $description: String) {
  updateProject(projectId: $projectId, title: $title, description: $description) {
    _id
    description
    tasks {
      description
      status
    }
    title
    users {
      _id
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($username: String!, $email: String!, $password: String!){
  updateUser(username: $username, email: $email, password: $password){
    username
    email
  }
}
`;
