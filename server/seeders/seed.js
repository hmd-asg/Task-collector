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
    const usersData = [
      {
        username: "John McClane",
        email: "john@diehard.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Martin Riggs",
        email: "martin@lethalweapon.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "James Bond",
        email: "james@007.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Rambo",
        email: "rambo@firstblood.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "The Terminator",
        email: "arnold@terminator.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Ethan Hunt",
        email: "ethan@missionimpossible.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Mad Max",
        email: "madmax@wasteland.com",
        password: await bcrypt.hash("rootroot", 10),
      },
      {
        username: "Dutch",
        email: "dutch@predator.com",
        password: await bcrypt.hash("rootroot", 10),
      },
    ];

    const users = await User.insertMany(usersData);

    const tasksData = [
      { description: "Defuse the Bomb", status: "in progress" },
      { description: "Rescue the Hostages", status: "not started" },
      { description: "Find the Hidden Base", status: "in progress" },
      { description: "Infiltrate the Enemy Lair", status: "completed" },
      { description: "Stop the Nuclear Launch", status: "not started" },
      { description: "Track the Enemy", status: "in progress" },
      { description: "Investigate the Warehouse", status: "in progress" },
      { description: "Escape the Trap", status: "not started" },
    ];

    const tasks = await Task.insertMany(tasksData);

    const projectsData = [
      {
        title: "Operation: Nakatomi Plaza",
        description: "A group of terrorists has taken over Nakatomi Plaza. Rescue the hostages and defuse the bomb.",
        users: [users[0]._id, users[1]._id],
        tasks: [tasks[0]._id, tasks[1]._id],
      },
      {
        title: "Mission: Impossible - Secret Base",
        description: "Infiltrate a secret enemy base and gather intelligence.",
        users: [users[2]._id, users[3]._id],
        tasks: [tasks[2]._id, tasks[3]._id],
      },
      {
        title: "Terminator: Judgment Day",
        description: "Prevent a nuclear apocalypse by stopping the launch.",
        users: [users[4]._id, users[5]._id],
        tasks: [tasks[4]._id, tasks[5]._id],
      },
      {
        title: "Escape from the Wasteland",
        description: "Survive and escape from a hostile wasteland with limited resources.",
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
