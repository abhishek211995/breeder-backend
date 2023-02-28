// express
const express = require("express");
const router = express.Router();

// Controllers
const { getFarms } = require("../controllers/masterController");

// Routes
router.get("/getAllFarm", getFarms);

module.exports = router;
