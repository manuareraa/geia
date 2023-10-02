const express = require("express");
const router = express.Router();
const CustomError = require("../../utils/error-handling/customError");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../middlewares/auth");
const { mongoose } = require("../../utils/db/db");
const crypto = require("crypto");

const db = mongoose.connection;
const collectionName = "users";

router.get("/user-data-by-id", authenticate, async (req, res, next) => {
  try {
    const user = await db
      .collection(collectionName)
      .findOne({ uuid: req.userUUID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: "success", user: user });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/user-data-by-token", authenticate, async (req, res, next) => {
  try {
    const user = await db
      .collection(collectionName)
      .findOne({ uuid: req.userUUID });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({ status: "success", user: user });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/get-all-projects", async (req, res) => {
  console.log("GET /user/get-all-projects");
  try {
    const projects = await db.collection("projects").find().toArray();
    res.status(200).json({ status: "success", projects: projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-blockchain-acc", async (req, res) => {
  console.log("POST /user/update-blockchain-acc");
  try {
    const user = await db.collection("users").findOne({ uuid: req.body.userUUID });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const updatedUser = await db
      .collection("users")
      .findOneAndUpdate(
        { uuid: req.body.userUUID },
        { $set: { blockchainAcc: req.body.blockchainAcc } },
        { returnOriginal: false }
      );

    res.status(200).json({ status: "success", user: updatedUser.value });
  } catch (error) {
    console.log(error);
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

// add a new txn document into the "transactions" collections
router.post("/add-txn", async (req, res) => {
  console.log("POST /user/add-txn");
  try {
    const newTxn = {
      uuid: crypto.randomUUID(),
      emai: req.body.email,
      projectUUID: req.body.projectUUID,
      txnType: req.body.txnType,
      txnData: req.body.txnData,
      txnDate: req.body.txnDate,
      txnMode: req.body.txnMode,
    };

    
    await db.collection("transactions").insertOne(newTxn);

    res.status(200).json({ status: "success", txn: newTxn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

module.exports = router;
