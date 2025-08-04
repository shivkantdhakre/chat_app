// controllers/user.controller.js
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

// Input validation helper
const validateInput = (username, password) => {
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
};

// Register controller
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input
    const validationErrors = validateInput(username, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await User.create({
      username: username.trim(),
      password,
    });

    // Generate token
    const token = generateToken(newUser._id, newUser.username);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      token,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
};

// Login controller
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username: username.trim() });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id, user.username);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

// Search controller
export const searchUsers = async (req, res) => {
  const search = req.query.q;

  try {
    if (!search || search.trim().length < 1) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      username: { $regex: search.trim(), $options: "i" },
    }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed. Please try again." });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
