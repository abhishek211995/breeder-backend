// user route
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
// Controllers
const {
  register,
  login,
  getUserData,
} = require("../controllers/userController");
const { uploadDocument } = require("../middleware/multer");

router.post("/auth/register", uploadDocument, register);
router.post("/auth/login", login);
router.get("/auth/user", getUserData);
router.get("/test", (req, res) => res.json({ message: "hello world" }));
module.exports = router;
