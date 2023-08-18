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
});

router.post("/update-gallery", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-gallery");
  try {
    if (req.role === "admin") {
      const { projectId, gallery } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            gallery: gallery,
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
});

router.post("/update-story", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-story");
  try {
    if (req.role === "admin") {
      const { projectId, story } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            story: story,
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
});

router.post("/update-metadata", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-metadata");
  try {
    if (req.role === "admin") {
      const { projectId, metadata } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            metadata: metadata,
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
});

router.post("/update-links", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-links");
  try {
    if (req.role === "admin") {
      const { projectId, links } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            links: links,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating links: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-documents", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-documents");
  try {
    if (req.role === "admin") {
      const { projectId, documents } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            documents: documents,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating documents: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-sponsors", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-sponsors");
  try {
    if (req.role === "admin") {
      const { projectId, sponsors } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            sponsors: sponsors,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating sponsors: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-seasons", authenticate, async (req, res) => {
  console.log("POST /api/admin/delete-seasons");
  try {
    if (req.role === "admin") {
      const { projectId, seasons } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            seasons: seasons,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while deleting seasons: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-conditions", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-conditions");
  try {
    if (req.role === "admin") {
      const { projectId, conditions } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            conditions: conditions,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating conditions: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

module.exports = router;
