const { errorHandler } = require("../helpers/error.handler");
const Client = require("../models/client.model");

const addClient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      passport,
      email,
      password,
      refresh_token,
      is_active,
    } = req.body;
    const newClient = await Client.create({
      first_name,
      last_name,
      phone,
      passport,
      email,
      password,
      refresh_token,
      is_active,
    });
    res.status(201).send({ message: "Client created", newClient });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({ include: Card });
    res.status(200).send({ clients });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id, { include: Card });
    res.status(200).send({ client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      phone,
      passport,
      email,
      password,
      refresh_token,
      is_active,
    } = req.body;

    await Client.update(
      {
        first_name,
        last_name,
        phone,
        passport,
        email,
        password,
        refresh_token,
        is_active,
      },
      { where: { id } }
    );
    res.status(200).send({ message: "Client updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await Client.destroy({ where: { id } });
    res.status(200).send({ message: "Client deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
    addClient,
    getAllClients,
    getClientById,
    deleteClient,
    updateClient
}