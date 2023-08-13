const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

const mongoDBURL = "mongodb://localhost:27017";
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
// app.use(morgan("dev")); // for development logging
// app.use(morgan("combined", { stream: combinedLogStream })); // for combined logging
// app.use(morgan("common", { stream: normalLogStream })); 

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const rateLimitConfig = require("../config/rateLimitConfig.json");

function getRateLimitConfig(endpoint) {
  return rateLimitConfig[endpoint] || { windowMs: 60000, max: 100 };
}

const v1Routes = require("../routes/v1/routes");
const v2Routes = require("../routes/v2/routes");

app.use("/api/v1/another", rateLimit(getRateLimitConfig("/api/v1/another")));
app.use("/api/v1/test", rateLimit(getRateLimitConfig("/api/v1/test")));

app.use("/api/v1/", v1Routes);

app.use("/api/v2", rateLimit(getRateLimitConfig("/api/v2")), v2Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
