// user route
const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  getUserData,
} = require("../controllers/userController");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/user", getUserData);

module.exports = router;
