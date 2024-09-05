const { User, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    userTasks: async (parent, { username }) => {
      return User.findOne({ username }).populate("tasks");
    },
    userProjects: async (parent, { username }) => {
      return User.findOne({ username }).populate("projects");
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ projectId }).populate('tasks');
    },
    meTasks: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("tasks");
      }
      throw AuthenticationError;
    },
    meProjects: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("projects");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addProject: async (parent, { title, description, users }, context) => {
      users.push(context.user)
      const project = await Project.create({
        title,
        description,
        users,
        tasks: [],
      });
      for (const user of users) {
       await User.findOneAndUpdate(
          { _id: user._id },
          {
            $addToSet: {
              projects: project,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      return project;
    },
    addTask: async (parent, { projectId, description }, context) => {
      if (context.user) {
        const task = await Task.create({
          description
        });
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              tasks: task,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    assignTask: async (parent, { userId, task }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              tasks: task,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    }, 
    removeProject: async (parent, { projectId }, context) => {
      const project = await Project.findOneAndDelete({
        _id: projectId,
      });

      return project;
    },
    removeTask: async (parent, { taskId }, context) => {
      const task = await Task.findOneAndDelete({
        _id: taskId,
      });

      return task;
    },
    updateTask: async (parent, { taskId, description, status }) => {
      return Task.findOneAndUpdate(
        { _id: taskId },
        { $set: { description: description, status: status } },
        { new: true }
      );
    },
    updateProject: async (
      parent,
      { projectId, title, description, users, tasks }
    ) => {
      const updateFields = {};
      if (title) updateFields.title = title;
      if (description) updateFields.description = description;
      if (users) updateFields.users = users;
      if (tasks) updateFields.tasks = tasks;

      return Project.findOneAndUpdate(
        { _id: projectId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
