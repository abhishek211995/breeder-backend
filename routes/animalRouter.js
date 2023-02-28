// express
const express = require("express");
const router = express.Router();

// Controllers
const { registerAnimal } = require("../controllers/animalController");

// Routes
router.post("/animal/register", registerAnimal);

module.exports = router;
