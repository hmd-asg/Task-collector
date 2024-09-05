const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  toDo: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  priorityValue: {
    type: Number,
    default: function() {
      switch (this.priority) {
        case "low": return 1;
        case "medium": return 2;
        case "high": return 3;
        case "critical": return 4;
      }
    },
  },
  currentStatus: {
    type: String,
    enum: ["not started", "in progress", "blocked", "completed"],
    default: "not started",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: Date,
  assignedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  subtasks: [
    {
      title: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["not started", "in progress", "completed"],
        default: "not started",
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }
  ],
  dependencies: [   //  Indicates if the completion of one task depends on the completion of another.
    {              
      type: Schema.Types.ObjectId,
      ref: "Task",
    }
  ],
  tags: [
    {
      type: String,
      trim: true,
    }
  ],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  comments: [
    {
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
    }
  ],
  auditLog: [
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

// Create the model from the schema and export it
const Task = model("Task", taskSchema);

module.exports = Task;
