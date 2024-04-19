import db from "../config/index";
import { Package, User } from "../models";
import { users, packages } from "./seed";

const seedData = async () => {
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");
    await db.sync({ force: true });

    for (const user of users) {
      await User.create(user);
    }
    for (const pkg of packages) {
      await Package.create(pkg);
    }

    console.log("Data seeding successful");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await db.close();
    console.log("Database connection closed.");
  }
};

seedData();
