// app.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");
const { generateJWT, verifyJWT } = require("./auth/auth"); // Import the JWT functions

// Import the role and authorization config file
const rolesAndAuthConfig = require("./config/rolesAndAuthConfig.json");
const app = express();

// MongoDB connection string. Replace 'your_database_url' with the actual connection string.
const mongoDBURL =
  "mongodb+srv://admin-geoblocs:mHxJZOVzCLYjUtY5@geoblocs-v1.3rjojjj.mongodb.net/";
// Connect to MongoDB
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a MongoDB connection object
const db = mongoose.connection;

// Middleware to create a new logger for each session
app.use((req, res, next) => {
  next();
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Centralized error handling
app.use((err, req, res, next) => {
  // Log the error
  console.error(err);

  // Respond with an error message
  res.status(500).json({ error: "Something went wrong" });
});

// Import the rate limiting config
const rateLimitConfig = require("./config/rateLimitConfig.json");

// Function to get rate limiting config for a specific endpoint
function getRateLimitConfig(endpoint) {
  return rateLimitConfig[endpoint] || { windowMs: 60000, max: 100 };
}

// Define routes
// Replace 'yourRoutesFolder' with the path to your routes files.
const v1AdminRoutes = require("./routes/v1/admin");
const v2Routes = require("./routes/v2/routes");

app.use("/api/v1/another", rateLimit(getRateLimitConfig("/api/v1/another")));
app.use("/api/v1/test", rateLimit(getRateLimitConfig("/api/v1/test")));

app.use("/api/v1/admin/", v1AdminRoutes);

app.use("/api/v2", rateLimit(getRateLimitConfig("/api/v2")), v2Routes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
