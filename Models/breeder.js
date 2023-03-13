const connection = require("../database/Connection");

const getBreeders = async (callback) => {
  connection.query(
    `SELECT bre_breeder.breeder_license_no, bre_user.userName, bre_user.email, bre_user.contact_no, bre_user.user_country, bre_user.user_status FROM bre_breeder INNER JOIN bre_user on bre_breeder.user_id = bre_user.id`,
    function (error, resp) {
      if (error) return callback(null);

      return callback(JSON.parse(JSON.stringify(resp)));
    }
  );
};

// Get breeder
const getBreeder = (id, callback) => {
  var user;
  connection.query(
    `SELECT * FROM bre_user INNER JOIN bre_breeder ON bre_user.id = bre_breeder.user_id WHERE id = "${id}"`,
    function (err, res) {
      if (err) throw err;
      user = JSON.parse(JSON.stringify(res))[0];
      console.log(user);
      return callback(user);
    }
  );
};

module.exports = { getBreeders, getBreeder };
