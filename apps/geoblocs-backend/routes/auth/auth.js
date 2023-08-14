const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // const userExists = await User.findOne({ username });

    // if (userExists) {
    //   return res.status(409).json({ message: "Username already exists" });
    // }

    // const newUser = new User({
    //   username,
    //   password,
    // });

    // await newUser.save();

    // res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    // const { username, password } = req.body;
    // const user = await User.findOne({ username });
    // if (!user) {
    //   return res.status(401).json({ message: "Invalid username or password" });
    // }
    // const isPasswordValid = await user.comparePassword(password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid username or password" });
    // }
    // const token = jwt.sign({ userId: user._id }, "secret_key");
    // res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
