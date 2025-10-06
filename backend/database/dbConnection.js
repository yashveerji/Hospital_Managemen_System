import mongoose from "mongoose";
import { seedDefaultUsers } from "./seedUsers.js";

export const dbConnection = () => {
  const dbName = process.env.DB_NAME || "Yashveerji Care_hms";
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName,
    })
    .then(async () => {
      console.log("Connected to database!");
      try {
        await seedDefaultUsers();
      } catch (error) {
        console.error("Failed to seed default users:", error);
      }
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
