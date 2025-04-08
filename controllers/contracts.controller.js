const errorHandler = require("../helpers/error.handler");
const Client = require("../models/client.model");
const Contract = require("../models/contracts.model");
const Product = require("../models/product.model");
const RentDuration = require("../models/rentduration.model");
const { Op } = require("sequelize"); 
const { contractValidation } = require("../validation/contract.validation");
const Status = require("../models/status.model");
const sequelize = require("../config/db");
const Category = require("../models/category.model");
const Owner = require("../models/owner.model");

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


const getRentedProducts = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    const rented = await Contract.findAll({
      where: {
        start_time: {
          [Op.gte]: start_at,
        },
        end_time: {
          [Op.lte]: end_at,
        },
      },
      include: [
        {
          model: Product,
          attributes: ["id", "model"],
        },
      ],
      attributes: ["start_time", "end_time"],
    });

    res.status(200).send({ rented });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCancelledClients = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    const cancelledClients = await Contract.findAll({
      where: {
        start_time: {
          [Op.between]: [start_at, end_at],
        },
      },
      include: [
        {
          model: Client,
          attributes: ["id", "first_name"],
        },
        {
          model: Product,
          attributes: ["model"],
        },
        {
          model: Status,
          where: { status: "refunded" },
          attributes: ["status"],
        },
      ],
      attributes: ["start_time"],
      distinct: true,
    });

    res.status(200).send({ cancelledClients });
  } catch (error) {
    errorHandler(error, res);
  }
};


const getDamagedClients = async (req, res) => {
  try {
    const { start_at, end_at } = req.body;

    const damagedClients = await Contract.findAll({
      where: {
        end_time: {
          [Op.between]: [start_at, end_at],
        },
      },
      include: [
        {
          model: Client,
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Product,
          attributes: ["model"],
        },
        {
          model: Status,
          where: { status: "invalid" },
          attributes: ["status"],
        },
      ],
      attributes: ["end_time"],
      distinct: true,
    });

    res.status(200).send({ damagedClients });
  } catch (error) {
    errorHandler(error, res);
  }
};

const { fn, col } = require("sequelize");

const getTopOwnersByCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const topOwners = await Contract.findAll({
      include: [
        {
          model: Product,
          attributes: [],
          include: [
            {
              model: Category,
              where: { name: categoryName },
              attributes: [],
            },
            {
              model: Owner,
              attributes: ["id", "full_name"],
            },
          ],
        },
      ],
      attributes: [
        [col("product.owner.id"), "owner_id"],
        [col("product.owner.full_name"), "full_name"],
        [fn("COUNT", "*"), "rental_count"],
      ],
      group: ["product.owner.id", "product.owner.full_name"],
      order: [[fn("COUNT", "*"), "DESC"]],
      raw: true,
    });

    res.status(200).json({ topOwners });
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
  getRentedProducts,
  getCancelledClients,
  getDamagedClients,
  getTopOwnersByCategory
};
