// express
const express = require("express");
const router = express.Router();

// Models
const { getAllFarm } = require("../models/master_data");

// connection
const connection = require("../database/Connection");

// get all farm
const getFarms = (req, res) => {
  getAllFarm((data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: "No farm found" });
    }
  });
};

module.exports = { getFarms };
