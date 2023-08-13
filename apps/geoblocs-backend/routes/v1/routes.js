// yourRoutes.js

const express = require("express");
const router = express.Router();
const logger = require("../../logs/logger");
const rolesAndAuthConfig = require("../../config/rolesAndAuthConfig.json");
const { generateJWT, verifyJWT } = require("../../auth/auth");
const db = require("../../app")

// Sample route with role-based authorization and rate limiting
router.get("/sample", (req, res, next) => {
  // Log the request using the session logger
  logger.info("Sample route requested");

  if (!req.user) {
    // Log the unauthorized access using the session logger
    logger.error("Unauthorized access to sample route");
    return res.status(403).json({ error: "Not authorized" });
  }

  if (!rolesAndAuthConfig[req.user.role].includes("sample")) {
    // Log the unauthorized access using the session logger
    logger.error("Unauthorized access to sample route");
    return res.status(403).json({ error: "Not authorized" });
  }

  // Log the successful response using the session logger
  logger.info("Sample route response sent");
  res.json({ message: "Sample route response" });
});

// Route for user registration
router.post("/register", (req, res) => {
  // Perform user registration
  // Replace this with your actual registration logic
  const { username, password, role } = req.body;
  const id = sampleUsers.length + 1; // Generate a unique ID (replace with your actual ID generation logic)

  const newUser = { id, username, password, role };
  sampleUsers.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// Route for user login
router.post("/login", (req, res) => {
  // Perform user login
  // Replace this with your actual login logic
  const { username, password } = req.body;
  const user = sampleUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate a JWT for the authenticated user
  const token = generateJWT(user);
  res.json({ token });
});

// Protected route that requires authentication
router.get("/protected", verifyJWT, (req, res) => {
  const user = sampleUsers.find((user) => user.id === req.user.userId);
  res.json({ message: `Welcome, ${user.username}! Your role is ${user.role}` });
});

router.get("/", (req, res, next) => {
  // Log the request using the session logger
  logger.info("Root route requested");

  // Log the successful response using the session logger
  logger.info("Root route response sent");
  res.json({ message: "v1 API Endpoints are working" });
});

router.get("/test", (req, res, next) => {
  logger.debug("(Debug) Test route requested");
  // Log the request using the session logger
  logger.info("Test route requested");

  // Log the successful response using the session logger
  logger.info("Test route response sent");
  res.json({ message: "v1 API Endpoints are working (test)" });
});

module.exports = router;
