const { errorHandler } = require("../helpers/error.handler");
const Card = require("../models/card.model");
const Client = require("../models/client.model");
const jwtService = require("../services/jwt.service");
const bcrypt = require('bcrypt');
const config = require('config');

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

    const hashedpassword = bcrypt.hashSync(password, 7);
    const newClient = await Client.create({
      first_name,
      last_name,
      phone,
      passport,
      email,
      password:hashedpassword,
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

const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(400).send({ message: "Client not found" });
    }
    const valuePas = bcrypt.compareSync(password, client.password);
    if (!valuePas) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const payload = {
      id: client.id,
      email: client.email,
      is_active: client.is_active
    };

    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = tokens.refreshToken;
    await client.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    console.log(req.cookies);

    res
      .status(200)
      .send({ message: "Login successful", accessToken: tokens.accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
    addClient,
    getAllClients,
    getClientById,
    deleteClient,
    updateClient,
    loginClient
}