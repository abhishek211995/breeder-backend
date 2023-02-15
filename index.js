// Express
var express = require("express");
var app = express();

// Port
var PORT = process.env.PORT || 3000;

//Mysql connection
var connection = require("./database/Connection");

// Create database
const createDatabase = () => {
  connection.query(
    "CREATE DATABASE IF NOT EXISTS breeder",
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};
createDatabase();

// Create tables
const createTables = () => {
  connection.query(
    "CREATE TABLE IF NOT EXISTS owner (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id))",
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );

  connection.query(
    "CREATE TABLE IF NOT EXISTS pets (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, breed VARCHAR(255) NOT NULL, owner_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (owner_id) REFERENCES owner(id))",
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

createTables();

// Insert data
const insertOwner = (name) => {
  connection.query(
    `INSERT INTO breeder.owner (name) VALUES ("${name}")`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// insertOwner("Ram");
// insertOwner("Shyam");

const insertPets = ({name,breed,owner_id}) => {
  connection.query(
    `INSERT INTO pets (name, breed, owner_id) VALUES ("${name}", "${breed}", ${owner_id})`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

// insertPets({ name: "Tommy", breed: "Pug", owner_id: 1 });
// insertPets({ name: "Bobby", breed: "Pug", owner_id: 1 });
// insertPets({ name: "Scooby", breed: "Pug", owner_id: 2 });
// insertPets({ name: "Dobby", breed: "Pug", owner_id: 2 });


// Select data
const selectOwner = (owner_id) => {
  connection.query(
    `SELECT owner.name as owner_name,pets.name as pet_name FROM owner INNER JOIN pets ON owner.id = pets.owner_id WHERE owner.id = ${owner_id}`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

selectOwner(1);
selectOwner(2);

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
