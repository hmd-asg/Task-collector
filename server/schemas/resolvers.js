const { User, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {

      return User.findOne({ username }).populate("projects");

    },
    projects: async () => {
      return Project.find().populate('tasks');
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId }).populate('tasks').populate("users");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("projects").populate("tasks");
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
    addProject: async (parent, { title, description }, context) => {
      const newProject = await Project.create({ title, description });
      if (context.user) {
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: newProject._id } },
          { new: true }
        )
        return await Project.findOneAndUpdate(
          { _id: newProject._id },
          { $addToSet: { users: context.user._id } },
          { new: true }
        );
      }
      return newProject;
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
              tasks: task._id,
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
              tasks: task._id,
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
      { projectId, title, description }
    ) => {
      const updateFields = {};
      if (title) updateFields.title = title;
      if (description) updateFields.description = description;

      return Project.findOneAndUpdate(
        { _id: projectId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
