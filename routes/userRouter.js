// user route
const express = require("express");
const router = express.Router();
// JsonWebToken
const jwt = require("jsonwebtoken");
// Dotenv
require("dotenv").config();
// Cookie Parser
const cookieParser = require("cookie-parser");
router.use(cookieParser());
// Bcrypt
const bcrypt = require("bcrypt");
// User Model Functions
const {
  createUser,
  createBreeder,
  loginUser,
  getUser,
} = require("../Models/User");

//! Register route
router.post("/", (req, res) => {
  try {
    const {
      userName,
      userType,
      password,
      email,
      contact,
      aadhar,
      license,
      farm_type,
    } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);
    // Registering user
    createUser(
      {
        userName,
        userType,
        password: passwordHash,
        email,
        contact,
        aadhar,
        farm_type,
      },
      (response) => {
        if (userType == "breeder") {
            // Create breeder from user
            createBreeder(
              {
                user_id: response,
                farm_type,
                license,
              },
              (insertID) => {
                if (insertID)
                  res
                    .status(200)
                    .send({ message: "User registered successfully" });
              }
            );
        }
      }
    );
  } catch (error) {
    res.status(400).send({ message: "User registration failed" });
  }
});

//! Login route
router.get("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    loginUser({ email, password }, (user) => {
      // Check if user exists
      if (user == null)
        return res
          .status(400)
          .send({ message: "User not exist or you have entered wrong fields" });

      // Create and assign a token
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
      // Set cookie
      res.cookie(
        "auth-token",
        { email: token.email, phone: token.phone },
        { httpOnly: true }
      );
      res.status(200).send({ message: "User logged in", user });
    });
  } catch (error) {
    res.status(400).send({ message: "User login failed" });
  }
});

module.exports = router;
