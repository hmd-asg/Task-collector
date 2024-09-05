const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    tasks: [Task]
    projects: [Project]
  }

  type Project {
    _id: ID!
    projectName: String!
    description: String
    createdBy: User!
    users: [User]
    tasks: [Task]
    completedTasks: Int
  }

  type Task {
    _id: ID!
    description: String!
    status: String!
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    userTasks(username: String!): User
    userProjects(username: String!): User
    project(projectId: ID!): Project
    meTasks: User
    meProjects: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, description: String, users: [ID]!): Project
    addTask(projectId: ID!, description: String!): Project
    assignTask(userId: ID!, task: ID!): User
    removeProject(projectId: ID!): Project
    removeTask(taskId: ID!): Task
    updateTask(taskId: ID!, description: String, status: String): Task
    updateProject(projectId: ID!, title: String, description: String, users: [ID], tasks: [ID]): Project
  }
`;

module.exports = typeDefs;
