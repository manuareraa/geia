// adminRoutes.js
const express = require("express");
const router = express.Router();
const { mongoose } = require("../../utils/db/db");
const { authenticate } = require("../../middlewares/auth");

const db = mongoose.connection;
const collectionName = "applications";

router.get("/get-all-applications", authenticate, async (req, res) => {
  console.log("GET /applications/get-all-applications");
  try {
    if (req.role === "admin") {
      const applications = await db.collection(collectionName).find().toArray();
      res.status(200).json({ status: "success", applications: applications });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

module.exports = router;
