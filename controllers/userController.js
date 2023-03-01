// express
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
// Auth
const Auth = require("../middleware/Auth");
// User Model Functions
const {
  createUser,
  createBreeder,
  loginUser,
  deleteUserPer,
  getUser,
} = require("../Models/User");

//! Register route
const register = (req, res) => {
  try {
    const {
      userName,
      userType,
      password,
      email,
      contact_no,
      license_no,
      identification_id_no,
      identification_id_name,
      farm_type_id,
      country,
    } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    // Regex for data validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const contactRegex = /^[0-9]{10}$/;
    const NameRegex = /^[a-zA-Z ]{2,30}$/;

    emailRegex.test(email) ||
      res.status(400).send({ message: "Invalid email" });
    contactRegex.test(contact_no) ||
      res.status(400).send({ message: "Invalid contact" });
    NameRegex.test(userName) ||
      res.status(400).send({ message: "Invalid name" });

    // Registering user
    createUser(
      {
        userName,
        userType,
        password: passwordHash,
        email,
        contact_no,
        identification_id_no,
        identification_id_name,
        country,
      },
      (response) => {
        // Check if user is created
        if (response == null)
          res.status(400).send({
            message: "User already exist",
          });

        // Check if user is breeder
        if (userType == "breeder") {
          createBreeder(
            {
              user_id: response,
              farm_type_id,
              license_no,
            },
            (insertID) => {
              // Check if breeder is created
              if (insertID)
                res
                  .status(200)
                  .send({ message: "User registered successfully" });
              else {
                // Delete user if breeder is not created
                deleteUserPer({ email }, (response) => {
                  if (response === "deleted")
                    res
                      .status(400)
                      .send({ message: "User registration failed" });
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "User registration failed" });
  }
};

//! Login route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    loginUser({ email, password }, (user) => {
      // Check if user exists
      if (user == null)
        return res
          .status(400)
          .send({ message: "User not exist or you have entered wrong fields" });

      // Check if user is verified
      if (user == "pending_verification")
        return res
          .status(200)
          .send({ message: "User is not verified yet please try again later" });

      // Create and assign a token
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
      // Set cookie
      res.cookie(
        "auth-token",
        { user_id: token.id, role_id: token.user_type_id, email: token.email },
        { httpOnly: true }
      );
      res.status(200).send({ message: "User logged in", user });
    });
  } catch (error) {
    res.status(400).send({ message: "User login failed" });
  }
};

const getUserData = (req, res) => {
  try {
    const { email } = req.body;

    getUser({ email }, (user) => {
      // Check if user exists
      if (user == null)
        return res.status(400).send({ message: "Please Login" });

      res.status(200).send({ message: "User found", user });
    });
  } catch (error) {
    res.status(400).send({ message: "User login failed" });
  }
};

module.exports = {
    register,
    login,
    getUserData
}