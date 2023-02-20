// connection
const connection = require("../database/Connection");

// Register pet
const RegisterPet = ({
  pet_name,
  pet_description,
  pet_breed,
  pet_color,
  pet_marking,
  pet_microchip_no,
  pet_dob,
  gender,
  owner_id,
  animal_id,
  breed_id,
  father_id,
  mother_id,
}) => {
  connection.query(
    "INSERT INTO bre_pet (pet_name, pet_description, pet_breed, pet_color, pet_marking, pet_microchip_no,pet_dob, gender, owner_id, animal_id, breed_id, father_id,mother_id,pet_status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      pet_name,
      pet_description,
      pet_breed,
      pet_color,
      pet_marking,
      pet_microchip_no,
      pet_dob,
      gender,
      owner_id,
      animal_id,
      breed_id,
      father_id,
      mother_id,
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

module.exports = {
  RegisterPet,
};
