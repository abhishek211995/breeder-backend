// user route
const express = require("express");
const router = express.Router();

const { createBreeder, createIndividual,getUser } = require("../Models/User");

router.post("/", (req, res) => {
  try {
    const { userName, userType, password, email, contact, aadhar, license } =
      req.body;
    if (userType === "breeder") {
      createBreeder({
        userName,
        userType,
        password,
        email,
        contact,
        aadhar,
        license,
      });
    } else {
      createIndividual({
        userName,
        userType,
        password,
        email,
        contact,
        aadhar,
      });
    }
    res.send("User created");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUser({ email, password });
        console.log(user);
        res.send("User fetched "+user);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
