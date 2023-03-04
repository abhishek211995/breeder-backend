const express = require("express");
const router = express.Router();
const { getBreederList } = require("../controllers/breederController");
router.get("/breeder", getBreederList);

module.exports = router;
