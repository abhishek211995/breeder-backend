// connection
const connection = require("../database/Connection");

// Bcrypt
const bcrypt = require("bcrypt");

const createBreeder = ({ breeder_id, license }) => {
  connection.query(
    `INSERT INTO Breeder (breeder_id,license) VALUES ("${breeder_id}","${license}")`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

const createUser = ({
  userName,
  userType,
  password,
  email,
  contact,
  aadhar,
}) => {
  connection.query(
    `INSERT INTO user (userName,userType,password,email,contact,aadhar) VALUES ("${userName}","${userType}","${password}","${email}","${contact}","${aadhar}")`,
    function (err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
};

const getUser = ({ email, password }, callback) => {
  var user;
  connection.query(
    `SELECT * FROM user WHERE email = "${email}"`,
    function (err, res) {
      if (err) throw err;
      // Validate password
      const password_auth = bcrypt.compareSync(password, res[0].password);
      if (!password_auth) return callback(null);
      // Return user
      user = JSON.parse(JSON.stringify(res))[0];
      return callback(user);
    }
  );
};

module.exports = { createUser, createBreeder, getUser };
