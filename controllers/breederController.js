const { getBreeders } = require("../Models/breeder");

const getBreederList = async (req, res, next) => {
  try {
    await getBreeders((response) => {
      if (response == null) {
        next();
      }
      res.status(200).json(response);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBreederList };
