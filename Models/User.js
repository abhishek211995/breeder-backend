// connection
const pool = require("../database/Connection");
// Bcrypt
const bcrypt = require("bcrypt");

// Register breeder
const createBreeder = ({ farm_type, user_id, license }, callback) => {
  var farm_id;
  if (farm_type == "stud")
    farm_id = 1;
  else if (farm_type == "cattery")
    farm_id = 2;
  else if (farm_type == "kennel")
    farm_id = 3;
    
  connection.query(
    `INSERT INTO bre_breeder (farm_id,breeder_license,user_id) VALUES ("${farm_id}","${license}","${user_id}")`,
    function (err, res) {
      if (err) return callback(null);
      console.log("breeder" + res.insertId);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};


// Register user
const createUser = (
  { userName, userType, password, email, contact, aadhar },
  callback
) => {

  var type;
  if (userType == "breeder") type = 2;
  else if (userType == "admin") type = 1;
  else type = 3;
  connection.query(
    `INSERT INTO bre_user (userName,user_type_id,password,email,contact,aadhar,user_status) VALUES ("${userName}","${type}","${password}","${email}","${contact}","${aadhar}","pending_verification")`,
    function (err, res) {
      if (err) {
        return callback(null);
      }
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

// Login user
const loginUser = ({ email, password }, callback) => {
  pool.getConnection(function (err, connection) {
    if (err) {
      // connection.release();
      throw err;
    }
    connection.query(
      `SELECT * FROM bre_user WHERE email = "${email}"`,
      function (err, res) {
        console.log(res);
        if (res?.length == 0 || err) {
          return callback(null);
        } else if (res[0]?.user_status == "pending_verification") {
          return callback("pending_verification");
        } else {
          // Validate password
          const password_auth = bcrypt.compareSync(password, res[0].password);
          if (!password_auth) return callback(null);
          // Return user
          if (res[0]?.userType == "breeder") {
            getBreeder(email, (user) => {
              return callback(user);
            });
          } else {
            return callback(JSON.parse(JSON.stringify(res))[0]);
          }
        }
      }
    );
  });
};

// Get user
const getUser = ({ email }, callback) => {
  var user;
  connection.query(
    `SELECT * FROM bre_user WHERE email = "${email}"`,
    function (err, res) {
      if (err) return callback(null);
      user = JSON.parse(JSON.stringify(res))[0];
      return callback(user);
    }
  );
};

// Get breeder
const getBreeder = (email, callback) => {
  var user;
  connection.query(
    `SELECT * FROM bre_user INNER JOIN breeder ON user.id = breeder.user_id WHERE email = "${email}"`,
    function (err, res) {
      if (err) throw err;
      user = JSON.parse(JSON.stringify(res))[0];
      console.log(user);
      return callback(user);
    }
  );
};

// delete user
const deleteUserPer = ({ email }, callback) => {
  connection.query(
    `DELETE FROM bre_user WHERE email = "${email}"`,
    function (err, res) {
      if (err) {
        console.log(err);
        return callback(null);
      } else return callback("deleted");
    }
  );
};



module.exports = {
  createUser,
  createBreeder,
  loginUser,
  getBreeder,
  getUser,
  deleteUserPer,
};
