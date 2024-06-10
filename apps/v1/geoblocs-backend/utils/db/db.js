// db.js
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://manuareraa:BpXYjzdzAYez4N3O@cluster0.w3ygzkx.mongodb.net";
const dbName = "geoblocs";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURL + "/" + dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = {
  connectToDatabase,
  mongoose,
};
