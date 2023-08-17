// adminRoutes.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { mongoose } = require("../../utils/db/db");
const { authenticate } = require("../../middlewares/auth");

const db = mongoose.connection;

router.get("/get-all-applications", authenticate, async (req, res) => {
  console.log("GET /applications/get-all-applications");
  try {
    if (req.role === "admin") {
      const applications = await db.collection("applications").find().toArray();
      res.status(200).json({ status: "success", applications: applications });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/send-response-to-applicant", authenticate, async (req, res) => {
  // body will contain message, applicationID, emailID, status
  console.log("POST /applications/send-response-to-applicant");
  try {
    if (req.role === "admin") {
      const { message, applicationID, applicantEmail, status } = req.body;
      const subject = "Response to your application #" + applicationID;

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
        to: applicantEmail,
        subject: subject,
        text: message,
      };

      try {
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).json({ status: "fail", message: error.message });
          } else {
            await db.collection("applications").updateOne(
              { applicationID: applicationID },
              {
                $set: {
                  status: status,
                  message: message,
                },
              }
            );
            res.status(200).json({ status: "success" });
          }
        });
      } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
      }
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/create-new-project", authenticate, async (req, res) => {
  console.log("POST /applications/create-new-project");
  try {
    if (req.role === "admin") {
      const { body } = req;
      const result = await db.collection("projects").insertOne(body);
      res.status(200).json({ status: "success", result });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/projects/count", async (req, res) => {
  console.log("GET /applications/projects/count");
  try {
    const count = await db.collection("projects").countDocuments();
    res.status(200).json({ status: "success", count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/get-all-projects", authenticate, async (req, res) => {
  console.log("GET /applications/projects/get-all-projects");
  try {
    if (req.role === "admin") {
      const projects = await db.collection("projects").find().toArray();
      res.status(200).json({ status: "success", projects: projects });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/change-live-status", authenticate, async (req, res) => {
  console.log("POST /api/admin/change-live-status");
  try {
    if (req.role === "admin") {
      const { projectId, status } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            status: status,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
})

module.exports = router;
