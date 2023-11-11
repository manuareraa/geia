// adminRoutes.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { mongoose } = require("../../utils/db/db");
const { authenticate } = require("../../middlewares/auth");
const axios = require("axios");

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

router.get("/get-project", authenticate, async (req, res) => {
  console.log("GET /applications/projects/get-all-projects");
  try {
    if (req.role === "admin") {
      const projects = await db
        .collection("projects")
        .find({ projectId: req.body.projectId })
        .toArray();
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

router.post("/update-monitors", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-monitors");
  try {
    if (req.role === "admin") {
      const { projectId, monitors } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            monitors: monitors,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(200).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating monitors: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-envData", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-envData");
  try {
    if (req.role === "admin") {
      const { projectId, envData } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            environment: envData,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(200).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating envData: ", error);
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

router.post("/update-geoblocs-data", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-geoblocs-data");
  try {
    if (req.role === "admin") {
      const { projectId, geoblocsData } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            geoblocsData: geoblocsData,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while updating geoblocsData: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/get-project-by-id", async (req, res) => {
  console.log("GET /api/admin/get-project-by-id");
  try {
    const { projectId } = req.query; // Use req.query to get parameters from GET request
    console.log("ProjectID", projectId);
    const projectData = await db
      .collection("projects")
      .findOne({ projectId: projectId });

    if (!projectData) {
      res.status(404).json({ status: "fail", message: "Project not found" });
    } else {
      res.status(200).json({ status: "success", project: projectData });
    }
  } catch (error) {
    console.log("Error occurred while fetching project data: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/get-project-token-details", async (req, res) => {
  console.log("GET /api/admin/get-project-token-details");
  try {
    const { projectId } = req.query; // Use req.query to get parameters from GET request
    console.log("ProjectID", projectId);
    const projectData = await db
      .collection("miniLedger")
      .findOne({ projectId: projectId });

    if (!projectData) {
      res.status(404).json({ status: "fail", message: "Project not found" });
    } else {
      res.status(200).json({ status: "success", project: projectData });
    }
  } catch (error) {
    console.log("Error occurred while fetching project data: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

// an endpoint to update the project token details. It will just replace the entire document
router.post("/update-project-token-details", async (req, res) => {
  console.log("POST /api/admin/update-project-token-details", req.body.tokenDetails);
  try {
    const { projectId, tokenDetails } = req.body;

    // Destructure to remove _id from tokenDetails, if it exists
    const { _id, ...updatedTokenDetails } = tokenDetails;

    // Using updateOne with $set operator
    await db
      .collection("miniLedger")
      .updateOne({ projectId: projectId }, { $set: updatedTokenDetails }, { upsert: true });

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log("Error occurred while updating project token details: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});


router.post("/delete-project-by-id", authenticate, async (req, res) => {
  console.log("GET /api/admin/get-project-by-id");
  try {
    if (req.role === "admin") {
      const { projectId } = req.body; // Use req.query to get parameters from GET request
      console.log("ProjectID", projectId);
      const response = await db
        .collection("projects")
        .deleteOne({ projectId: projectId });
      // .findOne({ projectId: projectId });

      if (!response) {
        res.status(404).json({ status: "fail", message: "Project not found" });
      } else {
        console.log("project deleted", projectId);
        res.status(200).json({ status: "success" });
      }
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while fetching project data: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/add-new-nft-collection", authenticate, async (req, res) => {
  console.log("POST /api/admin/add-new-nft-collection");
  try {
    if (req.role === "admin") {
      const { projectId, collectionData, tokenData } = req.body;
      await db.collection("nftCollections").insertOne({
        projectId: projectId,
        collectionData: collectionData,
        tokenData: tokenData,
      });
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while adding new collection: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-nft-collection", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-nft-collection");
  try {
    if (req.role === "admin") {
      const { projectId, tokenData } = req.body;
      await db.collection("nftCollections").updateOne(
        { projectId: projectId },
        {
          $push: {
            tokenData: tokenData,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while adding new collection: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-token-id", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-token-id");
  try {
    if (req.role === "admin") {
      const { projectId, tokenId } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $push: {
            "geoblocsData.tokenId": tokenId,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while adding new collection: ", error);
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.post("/update-token-price", authenticate, async (req, res) => {
  console.log("POST /api/admin/update-token-price");
  try {
    if (req.role === "admin") {
      const { projectId, price } = req.body;
      await db.collection("projects").updateOne(
        { projectId: projectId },
        {
          $set: {
            "geoblocsData.pricePerGeobloc": price,
          },
        }
      );
      res.status(200).json({ status: "success" });
    } else {
      res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error occurred while adding new collection: ", error);
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

// Periodic API request and data update every 30 seconds
// setInterval(async () => {
//   console.log("Started Periodic API request and data update every 30 seconds");
//   try {
//     const projects = await db.collection("projects").find().toArray();

//     for (const project of projects) {
//       const { projectId, geoblocsData } = project;

//       if (parseInt(geoblocsData.collectionId) > 0) {
//         console.log("Fetching for ", projectId, geoblocsData.collectionId);

//         const response = await axios.get(
//           "https://rest.unique.network/opal/v1/refungible/tokens/balance",
//           {
//             params: {
//               collectionId: parseInt(geoblocsData.collectionId),
//               tokenId: 1,
//               address: "5HW5Li9YDaG9v1yQZ83DbQWT92brzkVjBunCZpZ9zynnUaxB",
//             },
//             headers: {
//               Accept: "application/json",
//             },
//           }
//         );

//         const balance = response.data.amount;
//         const purchasedCount =
//           parseInt(geoblocsData.totalSupply) - parseInt(balance);

//         console.log(
//           "Project ID:",
//           projectId,
//           "Balance:",
//           balance,
//           purchasedCount
//         );
//         await updatePurchasedGeoblocs(projectId, purchasedCount);
//       }
//     }
//   } catch (error) {
//     console.error("Error in periodic API request and data update:");
//   }
// }, 5000);

module.exports = router;
