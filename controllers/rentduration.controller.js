const { errorHandler } = require("../helpers/error.handler");
const RentDuration = require("../models/rentduration.model");

const addRentDuration = async (req, res) => {
  try {
    const { duration, duration_type, price } = req.body;
    const newRentDuration = await RentDuration.create({
      duration,
      duration_type,
      price,
    });
    res.status(201).send({ message: "Rent duration created", newRentDuration });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllRentDurations = async (req, res) => {
  try {
    const rentDurations = await RentDuration.findAll();
    res.status(200).send({ rentDurations });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getRentDurationById = async (req, res) => {
  try {
    const { id } = req.params;
    const rentDuration = await RentDuration.findByPk(id);
    res.status(200).send({ rentDuration });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateRentDuration = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration, duration_type, price } = req.body;

    await RentDuration.update(
      {
        duration,
        duration_type,
        price,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Rent duration updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteRentDuration = async (req, res) => {
  try {
    const { id } = req.params;
    await RentDuration.destroy({ where: { id } });
    res.status(200).send({ message: "Rent duration deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addRentDuration,
  getAllRentDurations,
  getRentDurationById,
  updateRentDuration,
  deleteRentDuration,
};
