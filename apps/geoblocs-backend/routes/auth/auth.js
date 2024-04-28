const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signAndSendToken } = require("../../middlewares/auth");
require("dotenv").config();

const { mongoose } = require("../../utils/db/db");

const db = mongoose.connection;
const collectionName = "users";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, blockchainAcc } = req.body;

    // Check if the email already exists
    const existingUser = await db.collection(collectionName).findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userUUID = crypto.randomUUID();

    // Insert the new user into the database
    await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      uuid: userUUID,
      role: role,
      blockchainAcc: blockchainAcc,
    });

    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log("Signing In...");

    const { email, password } = req.body;

    // Find the user by email
    const user = await db.collection(collectionName).findOne({ email });

    if (!user) {
      console.log("No user found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token (assuming signAndSendToken is implemented correctly)
    const token = signAndSendToken(user);

    res.status(200).json({
      token: token,
      role: user.role,
      uuid: user.uuid,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "fail" });
  }
});

module.exports = router;
