// adminRoutes.js
const express = require("express");
const router = express.Router();

// Define admin-related routes here
router.get("/", (req, res) => {
  // Example: Retrieve admin data
  // const admins = await db.collection('admins').find().toArray();
  res.send("Admin routes");
});

module.exports = router;
