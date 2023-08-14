const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Import Mongoose
const authenticate = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());

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

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURL + "/" + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server once connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
