// connection
const connection = require("../database/Connection");

// Register pet
const RegisterAnimal = (
  {
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
    RegisterNo,
  },
  callback
) => {
  connection.query(
    "INSERT INTO bre_animal (pet_name, pet_breed, pet_color, pet_marking,pet_dob, gender, owner_id, animal_id, breed_id, father_id,mother_id,registration_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
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
      RegisterNo,
    ],
    function (err, res) {
      if (err) {
        console.log(err);
        return callback(null);
      }
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

// get animal count
const getAnimalCount = (callback) => {
  connection.query("SELECT * FROM bre_animal", function (err, res) {
    if (err) {
      console.log(err);
      return callback(null);
    }
    return callback(JSON.parse(JSON.stringify(res)));
  });
};

// get all breed from animal id
const getBreed = (animal_id, callback) => {
  try {
    connection.query(
      "SELECT * FROM bre_animal_breed WHERE animal_id = ?",
      [animal_id],
      function (err, res) {
        if (err) {
          console.log(err);
          return callback(null);
        }
        return callback(JSON.parse(JSON.stringify(res)));
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  RegisterAnimal,
  getBreed,
  getAnimalCount,
};
