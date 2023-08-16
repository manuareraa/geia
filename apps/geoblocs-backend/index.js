const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Import Mongoose
const cors = require("cors");
const authenticate = require("./middlewares/auth");
const { connectToDatabase } = require("./utils/db/db");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());
app.use(cors());

const mongoURL =
  "mongodb+srv://manuareraa:BpXYjzdzAYez4N3O@cluster0.w3ygzkx.mongodb.net";
const dbName = "geoblocs";

// Define your routes here
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth/auth");

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { mongoose };
