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

// const getAnimals = (callback) => {
//   connection.query("SELECT * FROM bre_animal", function (err, res) {
//     if (err) {
//       console.log(err);
//       return callback(null);
//     }
//     return callback(JSON.parse(JSON.stringify(res)));
//   });
// };

// union bre_animal_breed, bre_animal, bre_animal_type,bre_user
// where bre_animal.animal_id = bre_animal_type.id
// and bre_animal.breed_id = bre_animal_breed.id
// and bre_animal.owner_id = bre_user.id
const getAllAnimals = (callback) => {
  connection.query(
    "SELECT pet_name,breed_name,animal_name,pet_dob,gender,userName FROM bre_animal_breed, bre_animal, bre_animal_master,bre_user WHERE bre_animal.breed_id = bre_animal_breed.breed_id AND bre_animal.animal_id = bre_animal_master.animal_id AND bre_animal.owner_id = bre_user.id",
    function (err, res) {
      if (err) {
        console.log(err);
        return callback(null);
      }
      return callback(JSON.parse(JSON.stringify(res)));
    }
  );
};



module.exports = {
  RegisterAnimal,
  getBreed,
  getAnimalCount,
  getAllAnimals,
};
