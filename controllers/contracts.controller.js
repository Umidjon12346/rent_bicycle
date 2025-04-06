const errorHandler = require("../helpers/error.handler");
const Client = require("../models/client.model");
const Contract = require("../models/contracts.model");
const Product = require("../models/product.model");
const RentDuration = require("../models/rentduration.model");
const { contractValidation } = require("../validation/contract.validation");

const addContract = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      client_id,
      product_id,
      start_time,
      end_time,
      total_price,
      status_id,
      duration_id,
    } = value;
    const newContract = await Contract.create({
      client_id,
      product_id,
      start_time,
      end_time,
      total_price,
      status_id,
      duration_id,
    });
    res.status(201).send({ message: "Contract created", newContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [Product, RentDuration, Client],
    });
    res.status(200).send({ contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id, {
      include: [Product, RentDuration, Client],
    });
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = contractValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      client_id,
      product_id,
      start_time,
      end_time,
      total_price,
      status_id,
      duration_id,
    } = value;

    await Contract.update(
      {
        client_id,
        product_id,
        start_time,
        end_time,
        total_price,
        status_id,
        duration_id,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Contract updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    await Contract.destroy({ where: { id } });
    res.status(200).send({ message: "Contract deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addContract,
  getAllContracts,
  getContractById,
  updateContract,
  deleteContract,
};
