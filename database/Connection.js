var mysql = require("mysql");

// Create Roles
const { createRole } = require("../Models/master_data");

// dotenv
require("dotenv").config();

// MySQL setup
var connection = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
// });

module.exports = connection;
