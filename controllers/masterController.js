// express
const express = require("express");
const router = express.Router();

// Models
const { getAllFarm, getAnimalMaster } = require("../models/master_data");

// connection
const connection = require("../database/Connection");

// get all farm
const getFarmMaster = (req, res) => {
  getAllFarm((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: "No farm found" });
    }
  });
};

// get animal master
const getAnimalMasterData = (req, res) => {
  getAnimalMaster((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: "No animal master found" });
    }
  });
};

module.exports = { getFarmMaster, getAnimalMasterData };
