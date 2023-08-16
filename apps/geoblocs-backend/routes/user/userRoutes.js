const express = require("express");
const router = express.Router();
const CustomError = require("../../utils/error-handling/customError");
const jwt = require("jsonwebtoken");
const authenticate = require("../../middlewares/auth");
const { mongoose } = require("../../utils/db/db");

const db = mongoose.connection;
const collectionName = "users";

router.get("/user-data-id", authenticate, async (req, res, next) => {
  try {
    const userUUID = req.query.userUUID;

    const user = await db
      .collection(collectionName)
      .findOne({ uuid: userUUID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
