const { errorHandler } = require("../helpers/error.handler");
const Location = require("../models/location.model");
const Product = require("../models/product.model");
const Client = require("../models/client.model");

const addLocation = async (req, res) => {
  try {
    const { latitude, longitude, recorded_at, client_id, product_id } =
      req.body;
    const newLocation = await Location.create({
      latitude,
      longitude,
      recorded_at,
      client_id,
      product_id,
    });
    res.status(201).send({ message: "Location created", newLocation });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [Product, Client],
    });
    res.status(200).send({ locations });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id, {
      include: [Product, Client],
    });
    res.status(200).send({ location });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, recorded_at, client_id, product_id } =
      req.body;

    await Location.update(
      {
        latitude,
        longitude,
        recorded_at,
        client_id,
        product_id,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Location updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    await Location.destroy({ where: { id } });
    res.status(200).send({ message: "Location deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
