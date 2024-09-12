const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  users: [
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    }
  ],
 
}, { timestamps: true });

projectSchema.virtual('completedTasks').get(function() {
  return this.tasks.filter(task => task.status === "completed").length;
});

// Create the model from the schema and export it
const Project = model("Project", projectSchema);

module.exports = Project;
