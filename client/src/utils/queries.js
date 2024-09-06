import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
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
  query meProjects {
    meProjects {
      _id
      username
      projects {
        title
        description
        _id
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


