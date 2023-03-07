// express
const express = require("express");
const router = express.Router();

// Controllers
const {
  registerAnimal,
  getAnimalBreed,
} = require("../controllers/animalController");

// Routes
router.post("/animal/register", registerAnimal);
router.get("/animal/breed", getAnimalBreed);

module.exports = router;
