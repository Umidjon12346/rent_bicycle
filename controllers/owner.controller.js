const { errorHandler } = require("../helpers/error.handler");
const Owner = require("../models/owner.model");

const addOwner = async (req, res) => {
  try {
    const { full_name, phone, email, password, refresh_token, is_active } =
      req.body;
    const newOwner = await Owner.create({
      full_name,
      phone,
      email,
      password,
      refresh_token,
      is_active,
    });
    res.status(201).send({ message: "Owner created", newOwner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.status(200).send({ owners });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, email, password, refresh_token, is_active } =
      req.body;

    await Owner.update(
      { full_name, phone, email, password, refresh_token, is_active },
      { where: { id } }
    );
    res.status(200).send({ message: "Owner updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    await Owner.destroy({ where: { id } });
    res.status(200).send({ message: "Owner deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
    addOwner,
    getAllOwners,
    getOwnerById,
    deleteOwner,
    updateOwner
}