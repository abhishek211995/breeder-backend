
// Controllers
const { RegisterAnimal } = require("../controllers/animalController");

const registerAnimal = (req, res) => {
    RegisterAnimal(req.body, (data) => {
        if (data) {
            res.status(200).send({message:"Animal Registered Successfully"});
        } else {
            res.status(400).send({ message: "Error in registering animal" });
        }
    });
};

module.exports = { registerAnimal };
