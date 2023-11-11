const express = require("express");
const router = express.Router();
const CustomError = require("../../utils/error-handling/customError");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../../middlewares/auth");
const { mongoose } = require("../../utils/db/db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const axios = require("axios");

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
        subject: subject,
        text: "Hello, Thank you for purchasing Geoblocs. Please visit - https://wallet.unique.network/ and use your below private key to import you wallet.",
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

          const response = await axios.get(
            "https://rest.unique.network/opal/v1/refungible/tokens/balance",
            {
              params: {
                collectionId: parseInt(geoblocsData.collectionId),
                tokenId: 1,
                address: "5HW5Li9YDaG9v1yQZ83DbQWT92brzkVjBunCZpZ9zynnUaxB",
              },
              headers: {
                Accept: "application/json",
              },
            }
          );

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

    res.status(200).json({ status: "success", txn: newTxn });
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
