const db = require("../config/connection");
const { User, Project, Task } = require("../models");
const bcrypt = require("bcrypt");

// Clean database utility
const cleanDB = async () => {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log("Database cleaned successfully");
  } catch (err) {
    console.error(err);
  }
};
// DELETE WHEN APPROVED AND MERGED
// Users: Each user has an email and password. The user is associated with multiple tasks and projects.
// Projects: Each project has a title, description, and an array of tasks. It also has an array of users who are associated with the project.
// Tasks: Each task has a description, a status, is associated with a project, and is assigned to a user.

// Seed data
const seedData = async () => {
  try {
    // 1. Create Users
    const usersData = [
      { email: "geralt@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "yennefer@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "ciri@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "triss@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "dandelion@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "vesemir@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "zoltan@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
      { email: "regis@witchersguild.dev", password: await bcrypt.hash("rootroot", 10) },
    ];

    const users = await User.insertMany(usersData);

    // 2. Create Projects with Users as Creators and Assign Users
    const projectsData = [
      {
        title: "Defeat the Griffin",
        description: "A griffin is terrorizing the nearby village.",
        users: [users[0]._id, users[1]._id],
      },
      {
        title: "Retrieve the Sunstone",
        description: "Retrieve the ancient Sunstone from the caves.",
        users: [users[2]._id, users[3]._id],
      },
      {
        title: "Protect the King",
        description: "Ensure the safety of the king during the council.",
        users: [users[4]._id, users[5]._id],
      },
      {
        title: "Investigate the Haunted Manor",
        description: "A manor is said to be haunted, investigate the cause.",
        users: [users[6]._id, users[7]._id],
      },
    ];

    const projects = await Project.insertMany(projectsData);

    // 3. Create Tasks, Associate them with Projects and Assign Users
    const tasksData = [
      { description: "Scout the Griffin's Nest", status: "in progress", projectId: projects[0]._id, assignedTo: users[0]._id },
      { description: "Prepare Potions for the Fight", status: "not started", projectId: projects[0]._id, assignedTo: users[1]._id },
      { description: "Explore the Sunstone Caves", status: "in progress", projectId: projects[1]._id, assignedTo: users[2]._id },
      { description: "Decode the Ancient Texts", status: "completed", projectId: projects[1]._id, assignedTo: users[3]._id },
      { description: "Organize the King's Guards", status: "not started", projectId: projects[2]._id, assignedTo: users[4]._id },
      { description: "Set up Defensive Wards", status: "in progress", projectId: projects[2]._id, assignedTo: users[5]._id },
      { description: "Interview the Manor's Staff", status: "in progress", projectId: projects[3]._id, assignedTo: users[6]._id },
      { description: "Exorcise the Spirits", status: "not started", projectId: projects[3]._id, assignedTo: users[7]._id },
    ];

    const tasks = await Task.insertMany(tasksData);

    // 4. Associate Tasks with Projects and Users
    for (let i = 0; i < tasks.length; i++) {
      await Project.findByIdAndUpdate(tasks[i].projectId, { $push: { tasks: tasks[i]._id } });
      await User.findByIdAndUpdate(tasks[i].assignedTo, { $push: { tasks: tasks[i]._id } });
    }

    // 5. Associate Projects with Users
    for (let i = 0; i < projects.length; i++) {
      await User.updateMany(
        { _id: { $in: projects[i].users } },
        { $push: { projects: projects[i]._id } }
      );
    }

    console.log("Users, projects, and tasks seeded successfully!");
  } catch (err) {
    console.error(err);
  }
};

// Run the seed script
db.once("open", async () => {
  await cleanDB();
  await seedData();
  process.exit(0);
});
