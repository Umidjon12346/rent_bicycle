const errorHandler = require("../helpers/error.handler");
const Card = require("../models/card.model");
const Client = require("../models/client.model");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");
const mailService = require("../services/mail.service");
const uuid = require("uuid");
const { clientValidation } = require("../validation/client.validation");

const addClient = async (req, res) => {
  try {
    const { error, value } = clientValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      first_name,
      last_name,
      phone,
      passport,
      email,
      password,
      refresh_token,
      is_active,
    } = value;

    const hashedpassword = bcrypt.hashSync(password, 7);
    const activation_link = uuid.v4();
    const newClient = await Client.create({
      first_name,
      last_name,
      phone,
      passport,
      email,
      password: hashedpassword,
      refresh_token,
      is_active,
      activation_link,
    });

    await mailService.sendActivationMail(
      newClient.email,
      `${config.get("api_url")}/api/client/activate/${activation_link}`
    );

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
    const { error, value } = clientValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      first_name,
      last_name,
      phone,
      passport,
      email,
      password,
      refresh_token,
      is_active,
    } = value;

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
      is_active: client.is_active,
      role: "client",
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

const logoutClient = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);

    if (!refreshToken) {
      return res.status(400).send({ message: "Token not provided" });
    }

    const client = await Client.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!client) {
      return res.status(400).send({ message: "Invalid token" });
    }

    client.refresh_token = "";
    await client.save();

    res.clearCookie("refreshToken");
    res.send({ message: "client logout successful" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenClient = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Tokening yoqqqkuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu" });
    }

    const client = await Client.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!client) {
      return res.status(400).send({ message: "bunday tokenligi yoqqq" });
    }
    const payload = {
      id: client.id,
      email: client.email,
      is_active: client.is_active,
      role: "client",
    };

    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = tokens.refreshToken;
    await client.save();
    res.cookie("clientRefreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.status(200).send({ message: "Yangi", accessToken: tokens.accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

const clientActive = async (req, res) => {
  try {
    const user = await Client.findOne({
      where: { activation_link: req.params.link },
    });
    if (!user) {
      return res.status(404).send({ message: "Client not found" });
    }
    user.is_active = true;
    await user.save();
    res.send({
      message: "Client activated successfully",
      status: user.is_active,
    });
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
  loginClient,
  refreshTokenClient,
  logoutClient,
  clientActive,
};
