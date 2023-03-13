const { getBreeders, getBreeder } = require("../Models/breeder");

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

const getBreederData = async(req, res) => {
  try {
    const { id } = req.params;
    await getBreeder(id, (response) => {
      if (response == null) {
        res.status(400).send({ message: "User not found" });
      }
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getBreederList, getBreederData };
