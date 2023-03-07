// Controllers
const {
  RegisterAnimal,
  getBreed,
  getAnimalMaster,
  getAnimalCount,
} = require("../Models/Animal");



const registerAnimal = (req, res) => {
  let count = 0;

  getAnimalCount((data) => {
    if (data)
      count = data;
    else
      res.status(400).send({ message: "Error in getting animal count" });
  })

  const RegisterNo = new Date().getFullYear() + "/" + req.body.breed_id + "/" + count;
  const {
    pet_name,
    pet_breed,
    pet_color,
    pet_marking,
    pet_dob,
    gender,
    owner_id,
    animal_id,
    breed_id,
    father_id,
    mother_id,
  } = req.body;
  console.log(RegisterNo);
  RegisterAnimal({
    RegisterNo,
    pet_name,
    pet_breed,
    pet_color,
    pet_marking,
    pet_dob,
    gender,
    owner_id,
    animal_id,
    breed_id,
    father_id,
    mother_id,
  }, (data) => {
    if (data) {
      res.status(200).send({ message: "Animal Registered Successfully" });
    } else {
      res.status(400).send({ message: "Error in registering animal" });
    }
  });
};

const getAnimalBreed = (req, res) => {
  try {
    const { animal_id } = req.body;
    getBreed(animal_id, (data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send({ message: "Error in getting animal breed" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerAnimal, getAnimalBreed };
