// express
const express = require("express");
const router = express.Router();

// Controllers
const {
  registerAnimal,
  getAnimalBreed,
  getAllAnimal
} = require("../controllers/animalController");

// Routes
router.post("/animal/register", registerAnimal);
router.get("/animal/breed", getAnimalBreed);
router.get("/animal", getAllAnimal);

module.exports = router;
