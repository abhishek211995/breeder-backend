// connection
const connection = require("../database/Connection");

const createAnimal = ({ animal_name, animal_description }, callback) => {
  connection.query(
    `INSERT INTO animal (animal_name,animal_description) VALUES ("${animal_name}","${animal_description}")`,
    function (err, res) {
      if (err) return callback(null);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

const createFarm = ({ farm_name, farm_description }, callback) => {
  connection.query(
    `INSERT INTO farm (farm_name,farm_description) VALUES ("${farm_name}","${farm_description}")`,
    function (err, res) {
      if (err) return callback(null);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

const createAnimalBreed = (
  { animal_id, breed_name, breed_description },
  callback
) => {
  connection.query(
    `INSERT INTO animal_breed (animal_id,breed_name,breed_description) VALUES ("${animal_id}","${breed_name}", "${breed_description}")`,
    function (err, res) {
      if (err) return callback(null);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

// get farm master
const getAllFarm = (callback) => {
  connection.query(`SELECT * FROM bre_farm`, function (err, res) {
    if (err) return callback(null);
    return callback(JSON.parse(JSON.stringify(res)));
  });
};

// get animal master
const getAnimalMaster = (callback) => {
  try {
    console.log("getAnimalMaster");
    connection.query("SELECT * FROM bre_animal_master", (err, res) => {
      if (err) {
        console.log(err);
        return callback(null);
      }
      return callback(JSON.parse(JSON.stringify(res)));
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  // createAnimal,
  // createFarm,
  // createAnimalBreed,
  getAllFarm,
  getAnimalMaster,
};
