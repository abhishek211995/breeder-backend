const express = require("express");
const router = express.Router();
const { getBreederList,getBreederData } = require("../controllers/breederController");


router.get("/breeder", getBreederList);
router.get("/breeder/:id", getBreederData);


module.exports = router;
