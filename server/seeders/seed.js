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

// Seed data
const seedData = async () => {
  try {
    // 1. Create Users
    const usersData = [
      {
        username: "Geralt of Rivia",
        email: "geralt@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Yennefer of Vengerberg",
        email: "yennefer@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Ciri of Cintra",
        email: "ciri@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Triss Merigold",
        email: "triss@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Dandelion",
        email: "dandelion@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Vesemir",
        email: "vesemir@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Zoltan Chivay",
        email: "zoltan@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Regis",
        email: "regis@witchersguild.dev",
        password: await bcrypt.hash("rootroot", 10),
      },
    ];

    const users = await User.insertMany(usersData);

    // 2. Create Tasks
    const tasksData = [
      { description: "Scout the Griffin's Nest", status: "in progress" },
      { description: "Prepare Potions for the Fight", status: "not started" },
      { description: "Explore the Sunstone Caves", status: "in progress" },
      { description: "Decode the Ancient Texts", status: "completed" },
      { description: "Organize the King's Guards", status: "not started" },
      { description: "Set up Defensive Wards", status: "in progress" },
      { description: "Interview the Manor's Staff", status: "in progress" },
      { description: "Exorcise the Spirits", status: "not started" },
    ];

    const tasks = await Task.insertMany(tasksData);

    // 3. Create Projects with Users and Tasks
    const projectsData = [
      {
        title: "Defeat the Griffin",
        description: "A griffin is terrorizing the nearby village.",
        users: [users[0]._id, users[1]._id],
        tasks: [tasks[0]._id, tasks[1]._id],
      },
      {
        title: "Retrieve the Sunstone",
        description: "Retrieve the ancient Sunstone from the caves.",
        users: [users[2]._id, users[3]._id],
        tasks: [tasks[2]._id, tasks[3]._id],
      },
      {
        title: "Protect the King",
        description: "Ensure the safety of the king during the council.",
        users: [users[4]._id, users[5]._id],
        tasks: [tasks[4]._id, tasks[5]._id],
      },
      {
        title: "Investigate the Haunted Manor",
        description: "A manor is said to be haunted, investigate the cause.",
        users: [users[6]._id, users[7]._id],
        tasks: [tasks[6]._id, tasks[7]._id],
      },
    ];

    const projects = await Project.insertMany(projectsData);

    // 4. Update Users with assigned tasks and projects
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { tasks: tasks[0]._id, projects: projects[0]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { tasks: tasks[1]._id, projects: projects[0]._id },
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { tasks: tasks[2]._id, projects: projects[1]._id },
    });
    await User.findByIdAndUpdate(users[3]._id, {
      $push: { tasks: tasks[3]._id, projects: projects[1]._id },
    });
    await User.findByIdAndUpdate(users[4]._id, {
      $push: { tasks: tasks[4]._id, projects: projects[2]._id },
    });
    await User.findByIdAndUpdate(users[5]._id, {
      $push: { tasks: tasks[5]._id, projects: projects[2]._id },
    });
    await User.findByIdAndUpdate(users[6]._id, {
      $push: { tasks: tasks[6]._id, projects: projects[3]._id },
    });
    await User.findByIdAndUpdate(users[7]._id, {
      $push: { tasks: tasks[7]._id, projects: projects[3]._id },
    });

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
