import mongoose from "mongoose";
import User from "./models/User.js";
import Room from "./models/Room.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chatapp");
    console.log("✅ MongoDB Connected for seeding");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const users = [
    { username: "alice", password: "password123" },
    { username: "bob", password: "password123" },
    { username: "charlie", password: "password123" },
    { username: "diana", password: "password123" },
    { username: "emma", password: "password123" },
  ];

  try {
    // Clear existing users
    await User.deleteMany({});

    // Create new users (passwords will be hashed automatically)
    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }

    console.log(`✅ Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};

const seedRooms = async () => {
  const rooms = [
    { name: "General" },
    { name: "Random" },
    { name: "Help" },
    { name: "Off-topic" },
  ];

  try {
    // Clear existing rooms
    await Room.deleteMany({});

    // Create new rooms
    const createdRooms = await Room.insertMany(rooms);
    console.log(`✅ Created ${createdRooms.length} rooms`);
    return createdRooms;
  } catch (error) {
    console.error("❌ Error seeding rooms:", error);
  }
};

const seedData = async () => {
  await connectDB();
  await seedUsers();
  await seedRooms();
  console.log("🎉 Database seeded successfully!");
  process.exit(0);
};

seedData();
