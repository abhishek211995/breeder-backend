var mysql = require("mysql");

// Create Roles
const { createRole } = require("../Models/master_data");

// dotenv
require("dotenv").config();

// MySQL setup
var connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

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
  
  // Create User_Role table
  query = `CREATE TABLE IF NOT EXISTS bre_user_role (role_id INT NOT NULL AUTO_INCREMENT,role_name ENUM('admin','breeder','individual') NOT NULL,PRIMARY KEY(role_id))`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });
  // Create User table
  var query = `CREATE TABLE IF NOT EXISTS bre_user (id INT NOT NULL AUTO_INCREMENT, userName VARCHAR(255) NOT NULL,userTypeId INT NOT NULL,email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL,contact VARCHAR(255) NOT NULL,aadhar VARCHAR(255) NOT NULL,user_register_time DATETIME DEFAULT CURRENT_TIMESTAMP,user_update_time DATETIME DEFAULT CURRENT_TIMESTAMP,user_status ENUM('pending_verification','verified') NOT NULL, PRIMARY KEY (id),Foreign Key (userTypeId) References bre_User_Role(role_id))`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });

  // Create Breeder table
  query = `CREATE TABLE IF NOT EXISTS bre_breeder (breeder_id INT NOT NULL AUTO_INCREMENT,farm_type VARCHAR(255) NOT NULL,breeder_license VARCHAR(255) NOT NULL,user_id INT NOT NULL,PRIMARY KEY(breeder_id), FOREIGN KEY (user_id) REFERENCES bre_User(id))`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });

  // Create Farm table
  query = `CREATE TABLE IF NOT EXISTS bre_farm (farm_id INT NOT NULL AUTO_INCREMENT,farm_name VARCHAR(255) NOT NULL,farm_description VARCHAR(255) NOT NULL,PRIMARY KEY(farm_id))`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });

  // Create Animal table
  query = `CREATE TABLE IF NOT EXISTS bre_Animal (animal_id INT NOT NULL AUTO_INCREMENT,animal_name VARCHAR(255) NOT NULL,animal_description VARCHAR(255) NOT NULL,PRIMARY KEY(animal_id))`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });

  // Create Animal Breed table
  query = `CREATE TABLE IF NOT EXISTS bre_Animal_Breed (breed_id INT NOT NULL AUTO_INCREMENT,animal_id INT NOT NULL ,breed_name VARCHAR(255) NOT NULL,breed_description VARCHAR(255) NOT NULL,PRIMARY KEY(breed_id), FOREIGN KEY (animal_id) REFERENCES bre_Animal(animal_id))`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });

  // Create Pet table
  query =
    "CREATE TABLE IF NOT EXISTS bre_Pet (pet_id INT NOT NULL AUTO_INCREMENT,pet_name VARCHAR(255) NOT NULL,pet_description VARCHAR(255) NOT NULL,pet_breed VARCHAR(255) NOT NULL,pet_color VARCHAR(255) NOT NULL,pet_marking VARCHAR(255) NOT NULL,pet_microchip_no VARCHAR(255) NOT NULL,pet_dob DATE NOT NULL,gender ENUM('male','female') NOT NULL,owner_id INT NOT NULL,animal_id INT NOT NULL,breed_id INT NOT NULL,father_id INT NOT NULL,mother_id INT NOT NULL,PRIMARY KEY(pet_id), FOREIGN KEY (owner_id) REFERENCES bre_User(id), FOREIGN KEY (animal_id) REFERENCES bre_Animal(animal_id), FOREIGN KEY (breed_id) REFERENCES bre_Animal_Breed(breed_id), FOREIGN KEY (father_id) REFERENCES bre_Pet(pet_id), FOREIGN KEY (mother_id) REFERENCES bre_Pet(pet_id))";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });
};

createTables();

module.exports = connection;
