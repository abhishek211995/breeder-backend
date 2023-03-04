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

module.exports = { getBreeders };
