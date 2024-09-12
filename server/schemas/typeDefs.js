const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    tasks: [Task]
    projects: [Project]
  }

  type Project {
    _id: ID!
    title: String!
    description: String
    users: [User]
    tasks: [Task]
  }

  type Task {
    _id: ID!
    description: String
    status: String!
    assignedTo: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    project(projectId: ID!): Project
    me: User
    projects: [Project]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    addProject(title: String!, description: String): Project
    addTask(projectId: ID!, description: String!): Project
    assignTask(userId: ID!, task: ID!): User
    removeProject(projectId: ID!): Project
    removeTask(taskId: ID!): Task
    updateTask(taskId: ID!, description: String, status: String): Task
    updateProject(projectId: ID!, title: String, description: String): Project
    assignProject(username: String!, projectId: ID!): Project
  }
`;

module.exports = typeDefs;
