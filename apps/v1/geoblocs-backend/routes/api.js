const express = require("express");
const router = express.Router();

// Import route modules from subfolders
const adminRoutes = require("./admin/adminRoutes");
const userRoutes = require("./user/userRoutes");
const applicationsRoutes = require("./applications/applicationsRoutes");
const tokenRoutes = require("./tokens/tokenRoutes");

// Use the route modules
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/applications", applicationsRoutes);
router.use("/tokens", tokenRoutes);

module.exports = router;
