var mysql = require("mysql");

// MySQL setup
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Hrushi@2003",
  database: "breeder",
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

const createTables = () => {
  var query = `CREATE TABLE IF NOT EXISTS User (id INT NOT NULL AUTO_INCREMENT, userName VARCHAR(255) NOT NULL,userType VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL,contact VARCHAR(255) NOT NULL,aadhar VARCHAR(255) NOT NULL,license VARCHAR(255), PRIMARY KEY (id))`;
  connection.query(
    query,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );

  // connection.query(
  //   "CREATE TABLE IF NOT EXISTS pets (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, breed VARCHAR(255) NOT NULL, owner_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (owner_id) REFERENCES owner(id))",
  //   function (err, res) {
  //     if (err) throw err;
  //     console.log(res);
  //   }
  // );
};

createTables();

module.exports = connection;
