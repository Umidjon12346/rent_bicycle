const errorHandler = require("../helpers/error.handler");
const Payment = require("../models/payment.model");
const Contract = require("../models/contracts.model");
const Client = require("../models/client.model");
const { paymentValidation } = require("../validation/payment.validation");

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

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
