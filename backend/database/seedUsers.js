import { User } from "../models/userSchema.js";

const DEFAULT_USERS = [
  {
    firstName: "YashveerJi",
    lastName: "Admin",
    email: "admin@yashveerjicare.com",
    phone: "03001234567",
    nic: "1234512345123",
    dob: "1990-01-01",
    gender: "Female",
    password: "Admin@123",
    role: "Admin",
  },
  {
    firstName: "Peter",
    lastName: "Patient",
    email: "patient@yashveerjicare.com",
    phone: "03007654321",
    nic: "9876598765987",
    dob: "1995-05-12",
    gender: "Male",
    password: "Patient@123",
    role: "Patient",
  },
];

export const seedDefaultUsers = async () => {
  try {
    for (const userData of DEFAULT_USERS) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        continue;
      }
      await User.create(userData);
      console.log(
        `Created default ${userData.role} user with email ${userData.email}`
      );
    }
  } catch (error) {
    console.error("Error while creating default users:", error);
    throw error;
  }
};
