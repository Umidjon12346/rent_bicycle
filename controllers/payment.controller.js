const errorHandler = require("../helpers/error.handler");
const Payment = require("../models/payment.model");
const Contract = require("../models/contracts.model");
const Client = require("../models/client.model");
const { paymentValidation } = require("../validation/payment.validation");
const Owner = require("../models/owner.model");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

const addPayment = async (req, res) => {
  try {
    const { error, value } = paymentValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      client_id,
      contract_id,
      amount,
      payment_method,
      payment_time,
      status,
    } = value;
    const newPayment = await Payment.create({
      client_id,
      contract_id,
      amount,
      payment_method,
      payment_time,
      status,
    });
    res.status(201).send({ message: "Payment created", newPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [Client, Contract],
    });
    res.status(200).send({ payments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id, {
      include: [Client, Contract],
    });

    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }

    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};


const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = paymentValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      client_id,
      contract_id,
      amount,
      payment_method,
      payment_time,
      status,
    } = value;

    await Payment.update(
      {
        client_id,
        contract_id,
        amount,
        payment_method,
        payment_time,
        status,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Payment updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await Payment.destroy({ where: { id } });
    res.status(200).send({ message: "Payment deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};



const getClientPayments = async (req, res) => {
  try {
    const { client_id } = req.body;

    const payments = await Payment.findAll({
      where: { client_id },
      include: [
        {
          model: Contract,
          include: [
            {
              model: Client,
              attributes: ["first_name", "email"],
            },
            {
              model: Product,
              attributes: ["model"],
              include: [
                {
                  model: Owner,
                  attributes: ["full_name"],
                },
                {
                  model: Category,
                  attributes: ["name"],
                },
              ],
            },
          ],
          attributes: [],
        },
      ],
      attributes: ["amount", "payment_method", "payment_time", "status"],
      raw: true,
    });

    const formatted = payments.map((p) => ({
      client_name: p["contract.client.first_name"],
      client_email: p["contract.client.email"],
      category_name: p["contract.product.category.name"],
      product_name: p["contract.product.model"],
      owner_name: p["contract.product.owner.full_name"],
      amount: p.amount,
      payment_method: p.payment_method,
      payment_time: p.payment_time,
      status: p.status,
    }));

    res.status(200).send({ payments: formatted });
  } catch (error) {
    errorHandler(error, res);
  }
};


module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getClientPayments
};
