const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
});

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
  },
  commentAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const milestoneSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false,
  },
});

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedMembers: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    }
  ],
  tasks: [taskSchema],
  status: {
    type: String,
    enum: ["not started", "in progress", "completed", "on hold", "canceled"],
    default: "not started",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  dueDate: Date,
  tags: [
    {
      type: String,
      trim: true,
    }
  ],
  comments: [commentSchema],
  attachments: [
    {
      fileName: String,
      fileUrl: String,
      uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  milestones: [milestoneSchema],
  auditLogs: [
    {
      action: {
        type: String,
        required: true,
      },
      performedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      performedAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

projectSchema.virtual('completedTasks').get(function() {
  return this.tasks.filter(task => task.status === "completed").length;
});

// Create the model from the schema and export it
const Project = model("Project", projectSchema);

module.exports = Project;
