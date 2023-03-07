// express
const express = require("express");
const router = express.Router();

// Controllers
const {
  getFarmMaster,
  getAnimalMasterData,
} = require("../controllers/masterController");

// Routes
router.get("/getAllFarm", getFarmMaster);
router.get("/getAnimalMaster", getAnimalMasterData);

module.exports = router;
