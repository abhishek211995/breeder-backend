// connection
const connection = require("../database/Connection");
// Bcrypt
const bcrypt = require("bcrypt");

// Register breeder
const createBreeder = (
  { farm_type_id, user_id, license_no },
  callback
) => {
  connection.query(
    `INSERT INTO bre_breeder (farm_id,breeder_license_no,user_id) VALUES ("${farm_type_id}","${license_no}","${user_id}")`,
    function (err, res) {
      console.log(err);
      if (err) return callback(null);
      // console.log("breeder" + res.insertId);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

// add breeder doc details in breeder_doc_verification table
const addBreederDoc = (
  { breeder_id, license_doc, license_doc_expiry_date, license_doc_status },
  callback
) => {
  connection.query(
    `INSERT INTO bre_breeder_license_verification (breeder_id,license_doc,license_doc_expiry_date,license_doc_status) VALUES ("${breeder_id}","${license_doc}","${license_doc_expiry_date}", "${license_doc_status}")`,
    function (err, res) {
      console.log(err);
      if (err) return callback(null);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

// Register user
const createUser = async (
  {
    userName,
    userType,
    password,
    email,
    contact_no,
    identification_id_no,
    identification_id_name,
    country,
    identity_doc_name,
  },
  callback
) => {
  var type;
  if (userType == "breeder") type = 2;
  else if (userType == "admin") type = 1;
  else type = 3;
  connection.query(
    `INSERT INTO bre_user (userName,user_type_id,password,email,contact_no,user_country,identification_id_no,identification_id_name,user_status,identity_doc_name) VALUES ("${userName}","${type}","${password}","${email}","${contact_no}","${country}","${identification_id_no}","${identification_id_name}","pending_verification","${identity_doc_name}")`,
    function (err, res) {
      console.log("err", err);
      if (err && err.code == "ER_DUP_ENTRY") {
        return callback("duplicate");
      } else if (err) {
        return callback(null);
      }
      // console.log("user creation res", res);
      return callback(JSON.parse(JSON.stringify(res)).insertId);
    }
  );
};

// Login user
const loginUser = ({ email, password }, callback) => {
  connection.query(
    `SELECT * FROM bre_user WHERE email = "${email}"`,
    function (err, res) {
      if (res.length == 0 || err) {
        return callback(null);
      } else if (res[0].user_status == "pending_verification") {
        return callback("pending_verification");
      } else {
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
    }
  );
};

// Get user
const getUser = ({ id }, callback) => {
  var user;
  connection.query(
    `SELECT * FROM bre_user WHERE id = "${id}"`,
    function (err, res) {
      if (err) return callback(null);
      user = JSON.parse(JSON.stringify(res))[0];
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

// delete breeder
const deleteBreederPer = ({ id }, callback) => {
  connection.query(
    `DELETE FROM bre_breeder WHERE id = "${id}"`,
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
  // getBreeder,
  getUser,
  deleteUserPer,
  addBreederDoc,
  deleteBreederPer,
};

// cron to update doc status to unverified after expiry date is reached
// const cron = require("node-cron");
// const { connection } = require("../database/Connection");

// cron.schedule("0 0 0 * * *", () => {
//   console.log("running a task every day at midnight");
//   connection.query(
//     `UPDATE bre_breeder_license_verification SET license_doc_status = "unverified" WHERE license_doc_expiry_date < CURDATE()`,
//     function (err, res) {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         console.log("updated");
//         return;
//       }
//     }
//   );
// });
