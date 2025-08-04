// routes/user.routes.js
import express from "express";
import {
  registerUser,
  loginUser,
  searchUsers,
  getProfile,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", authenticateToken, getProfile);

// Get all users - GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await (
      await import("../models/User.js")
    ).default.find({}, "username _id createdAt");
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Search - GET /api/users/search?q=username
router.get("/search", searchUsers);

export default router;
