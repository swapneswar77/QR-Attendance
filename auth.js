const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup route for new students
router.post("/signup", async (req, res) => {
  const { id, name, qrCode } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ id, name, qrCode });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route for old students
router.post("/login", async (req, res) => {
  const { id, name } = req.body;

  try {
    const user = await User.findOne({ id, name });

    if (!user) {
      return res.status(401).json({ message: "Invalid ID or Name" });
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
