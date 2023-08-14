// userRoutes.js
const express = require("express");
const router = express.Router();
const CustomError = require("../../utils/error-handling/customError");

// Define user-related routes here
router.get("/", (req, res, next) => {
  try {
    // Example: Retrieve user data
    // const users = await db.collection('users').find().toArray();

    // If an error occurs, throw a custom error
    throw new CustomError("Error retrieving user data", 500);

    res.send("User routes");
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
});

module.exports = router;
