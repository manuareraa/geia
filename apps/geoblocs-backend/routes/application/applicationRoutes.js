const express = require("express");
const router = express.Router();
const { mongoose } = require("../../utils/db/db");

const db = mongoose.connection;
const collectionName = "applications";

router.get("/count", async (req, res) => {
  console.log("GET /applications/count");
  try {
    const count = await db.collection(collectionName).countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/new", async (req, res) => {
  console.log("POST /applications/new");
  try {
    const { body } = req;
    const result = await db.collection(collectionName).insertOne(body);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
