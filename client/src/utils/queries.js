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
    user {
      _id
      username
      projects {
        _id
        title
        description
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
      title
      descriptions
      tasks {
        _id
      }
    }
  }
`;


