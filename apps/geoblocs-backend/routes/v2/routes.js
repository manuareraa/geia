// yourRoutes.js

const express = require("express");
const router = express.Router();

// Import the role and authorization config file
const rolesAndAuthConfig = require("../../config/rolesAndAuthConfig.json");

// Sample route with role-based authorization and rate limiting
router.get("/sample", (req, res, next) => {
  if (!rolesAndAuthConfig[req.user.role].includes("sample")) {
    return res.status(403).json({ error: "Not authorized" });
  }
  res.json({ message: "Sample route response" });
});

router.get("/", (req, res, next) => {
  res.json({ message: "v2 API Endpoints are working" });
});

module.exports = router;
