const express = require("express");
const router = express.Router();
const CustomError = require("../../utils/error-handling/customError");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../middlewares/auth");
const { mongoose } = require("../../utils/db/db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require("axios");
const fs = require("fs");
const imgB64 = require("../../assets/imgB64");

const db = mongoose.connection;
const collectionName = "tokens";

// https://geoblocs.com/tokens/tokendata/{id}
router.get("/tokendata/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const tokenData = await db
      .collection(collectionName)
      .findOne({ tokenId: id });

    if (!tokenData) {
      return res.status(404).json({ message: "Token not found" });
    }

    res.status(200).json({ status: "success", token: user });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/find-user-by-email", async (req, res) => {
  console.log("POST /user/find-user-by-email");
  try {
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({ status: "success", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});


module.exports = router;
