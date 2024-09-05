const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  assignedTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    }
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    }
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatarUrl: String,
  },
}, { timestamps: true });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Password comparison method
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// Indexes for faster queries
userSchema.index({ email: 1 });

// Create the model
const User = model("User", userSchema);

module.exports = User;
