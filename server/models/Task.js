const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

// Create the model from the schema and export it
const Task = model("Task", taskSchema);

module.exports = Task;
