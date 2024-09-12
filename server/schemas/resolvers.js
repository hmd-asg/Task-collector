const { User, Project, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("projects").populate("tasks");
    },
    projects: async () => {
      return Project.find().populate('tasks');
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId }).populate('tasks').populate("users");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: 'projects',
          populate: {
            path: 'users',
            model: 'User'
          }
        }).populate("tasks");
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
    updateUser: async (parent, { username, email, password }, context) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.findOneAndUpdate({ _id: context.user._id }, {
        $set: { username: username, email: email, password: hashedPassword }
      },
        { new: true }
      );
      return newUser;
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

        );
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
          description,
          status: "not started", // Ensure status is set
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
        ).populate('tasks'); // Populate tasks to return updated project
      }
      throw AuthenticationError;
    },
    assignTask: async (parent, { userId, task }, context) => {
      if (context.user) {
        // Assign the task to the user
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
    updateProject: async (parent, { projectId, title, description }) => {
      const updateFields = {};
      if (title) updateFields.title = title;
      if (description) updateFields.description = description;

      return Project.findOneAndUpdate(
        { _id: projectId },
        { $set: updateFields },
        { new: true }
      );
    },
    assignProject: async (parent, { username, projectId }) => {

      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            projects: projectId,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return Project.findOneAndUpdate(
        { _id: projectId },
        {
          $addToSet: {
            users: user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
    }
  },
};

module.exports = resolvers;
