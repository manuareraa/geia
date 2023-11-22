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
    const user = await db
      .collection("users")
      .findOne({ uuid: req.body.userUUID });

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
      email: req.body.email,
      projectUUID: req.body.projectUUID,
      txnType: req.body.txnType,
      txnData: req.body.txnData,
      txnDate: req.body.txnDate,
      txnMode: req.body.txnMode,
    };

    await db.collection("transactions").insertOne(newTxn);

    // sending email
    try {
      const subject = "Geoblocs Transaction Successful!!";

      // Create a transporter using SMTP transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "geoblocs@gmail.com",
          pass: "isgepltzwmskzkfn",
        },
      });

      // Setup email data
      const mailOptions = {
        from: "geoblocs@gmail.com",
        to: req.body.email,
        // to: "manuareraa@gmail.com",
        subject: subject,
        text: "Your Geoblocs transaction was successful!",
        html: `
    <p>Hi there,</p>

    <p><img src="https://gcdnb.pbrd.co/images/kXyRnM6YOL2d.png" alt="Inline Image" height="300px"></p>

    <p>Heartfelt thanks for purchasing Geoblocs and joining our cause to heal our planet. Your support is pivotal in combating environmental degradation alongside its broader societal and economic impacts.</p>

    <p>Geoblocs, as fragments of a project-specific NFTs, hold invaluable project insights accessible via their metadata. This data serves as a compass, allowing you to track the project's impactful journey on its dedicated dashboard.</p>

    <p>Your contribution not only aids in restoring our precious lands but also champions the resolution of wider societal and economic challenges intertwined with environmental concerns.</p>

    <p>Your dedication to making a positive impact through your support is truly inspiring and deeply appreciated.</p>

    <p>With gratitude,</p>
  `,
      };

      try {
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent");
          }
        });
      } catch (error) {
        console.log("Error", error);
      }
    } catch (error) {
      console.log(error);
    }

    // fetch new balance
    try {
      const projects = await db.collection("projects").find().toArray();

      for (const project of projects) {
        const { projectId, geoblocsData } = project;

        if (parseInt(geoblocsData.collectionId) > 0) {
          console.log("Fetching for ", projectId, geoblocsData.collectionId);

          const response = await axios.get(process.env.BLOCKCHAIN_URL, {
            params: {
              collectionId: parseInt(geoblocsData.collectionId),
              tokenId: 1,
              address: "5HWGGcEa2Qm6u6PS4DxUfctQuW9Ddpgo5NCqCF6JyVXF1KZM",
            },
            headers: {
              Accept: "application/json",
            },
          });

          const balance = response.data.amount;
          const purchasedCount =
            parseInt(geoblocsData.totalSupply) - parseInt(balance);

          console.log(
            "Project ID:",
            projectId,
            "Balance:",
            balance,
            purchasedCount
          );
          await updatePurchasedGeoblocs(projectId, purchasedCount);
        }
      }
    } catch (error) {
      console.error("Error in periodic API request and data update:", error);
    }

    // res.status(200).json({ status: "success", txn: newTxn });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

const updatePurchasedGeoblocs = async (projectId, purchasedCount) => {
  try {
    await db
      .collection("projects")
      .updateOne(
        { projectId },
        { $set: { "geoblocsData.purchased": purchasedCount } }
      );
    console.log(`Updated purchased count for project ${projectId}`);
  } catch (error) {
    console.error(
      `Error updating purchased count for project ${projectId}:`,
      error
    );
  }
};

module.exports = router;
