const  errorHandler  = require("../helpers/error.handler");
const Card = require("../models/card.model");
const { cardValidation } = require("../validation/card.validation");

const addCard = async (req, res) => {
  try {
    const { error, value } = cardValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { number, date, user_id, card_type } = value;
    const newCard = await Card.create({
      number,
      date,
      user_id,
      card_type,
    });
    res.status(201).send({ message: "Card created", newCard });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.findAll({ include: Client });
    res.status(200).send({ cards });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id, { include: Client });
    res.status(200).send({ card });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = cardValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { number, date, user_id, card_type } = value;

    await Card.update({ number, date, user_id, card_type }, { where: { id } });
    res.status(200).send({ message: "Card updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    await Card.destroy({ where: { id } });
    res.status(200).send({ message: "Card deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
    addCard,
    getAllCards,
    getCardById,
    deleteCard,
    updateCard
}
