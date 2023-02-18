// connection
const connection = require("../database/Connection");

// Bcrypt
const bcrypt = require("bcrypt");

const createBreeder = ({ farm_type, user_id, license },callback) => {
  connection.query(
    `INSERT INTO Breeder (farm_type,breeder_license,user_id) VALUES ("${farm_type}","${license}","${user_id}")`,
    function (err, res) {
      if (err) 
        return callback(null);
      console.log("breeder"+res.insertId);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

const createUser = (
  { userName, userType, password, email, contact, aadhar },
  callback
) => {
  connection.query(
    `INSERT INTO user (userName,userType,password,email,contact,aadhar,user_status) VALUES ("${userName}","${userType}","${password}","${email}","${contact}","${aadhar}","active")`,
    function (err, res) {
      if (err)
        return callback(null);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

const loginUser = ({ email, password }, callback) => {
  connection.query(
    `SELECT * FROM user WHERE email = "${email}"`,
    function (err, res) {
      if (err) throw err;
      // Validate password
      const password_auth = bcrypt.compareSync(password, res[0].password);
      if (!password_auth) return callback(null);
      // Return user
      if (res[0].userType == "breeder") {
        getBreeder(email, (user) => {
          return callback(user);
        });
      } else {
        return callback(JSON.parse(JSON.stringify(res))[0]);
      }
    }
  );
};

const getUser = ({ email }, callback) => {
  var user;
  connection.query(
    `SELECT * FROM user WHERE email = "${email}"`,
    function (err, res) {
      if (err)
        return callback(null);
      user = JSON.parse(JSON.stringify(res))[0];
      return callback(user);
    }
  );
};

const getBreeder = (email, callback) => {
  var user;
  connection.query(
    `SELECT * FROM user INNER JOIN breeder ON user.id = breeder.user_id WHERE email = "${email}"`,
    function (err, res) {
      if (err) throw err;
      user = JSON.parse(JSON.stringify(res))[0];
      console.log(user);
      return callback(user);
    }
  );
};

module.exports = { createUser, createBreeder, loginUser, getBreeder, getUser };
