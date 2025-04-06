const  errorHandler  = require("../helpers/error.handler");
const RentDuration = require("../models/rentduration.model");
const { rentDurationValidation } = require("../validation/rentduration.validation");

const addRentDuration = async (req, res) => {
  try {
    const { error, value } = rentDurationValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { duration, duration_type, price } = value;
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
    const { error, value } = rentDurationValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { duration, duration_type, price } = value;

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
