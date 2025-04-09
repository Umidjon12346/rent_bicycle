const  errorHandler  = require("../helpers/error.handler");
const Status = require("../models/status.model");
const { statusValidation } = require("../validation/status.validation");

const addStatus = async (req, res) => {
  try {
    const { error, value } = statusValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { status } = value;
    const newStatus = await Status.create({
      status,
    });
    res.status(201).send({ message: "Status created", newStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).send({ statuses });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);

    if (!status) {
      return res.status(404).send({ message: "Status not found" });
    }

    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};


const updateStatus = async (req, res) => {
  try {
     const { error, value } = statusValidation(req.body);
     console.log(error);
     if (error) {
       return res.status(400).send({ message: error.details[0].message });
     }
    const { id } = req.params;
    const { status } = value;

    await Status.update(
      {
        status,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Status updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await Status.destroy({ where: { id } });
    res.status(200).send({ message: "Status deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
};
