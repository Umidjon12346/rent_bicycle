const errorHandler = require("../helpers/error.handler");
const Card = require("../models/card.model");
const Client = require("../models/client.model");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");
const mailService = require("../services/mail.service");
const uuid = require("uuid");
const { clientValidation } = require("../validation/client.validation");
const { createOtp } = require("./otp.controller");
const { cli } = require("winston/lib/winston/config");

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
    
    const newClient = await Client.create({
      first_name,
      last_name,
      phone,
      passport,
      email,
      password: hashedpassword,
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
    const { error, value } = clientValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      first_name,
      last_name,
      phone,
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

const updatePassword = async (req, res) => {
  try {
    const { email, password, new_password, confirm_password } = req.body;
    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    const valuePassword = bcrypt.compareSync(password, client.password);
    if (!valuePassword) {
      return res.status(400).send({ message: "Parol xato" });
    }

    if (new_password !== confirm_password) {
      return res.status(400).send({ message: "Parol xato kiritildi" });
    }

    const hashedPassword = bcrypt.hashSync(new_password, 10);
    client.password = hashedPassword;
    await client.save();

    res.status(200).send({ message: "Parol muvaffaqiyatli o'zgardi" });
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


const registerClient = async (req, res) => {
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
    const client = await Client.create({
      first_name,
      last_name,
      phone,
      passport,
      email,
      password: hashedpassword,
      refresh_token,
      is_active,
      activation_link
    });
    // const otp = await createOtp(client.email); // Emailga mos OTP yaratish
    // // OTPni emailga yuborish
    // await mailService.sendOtpMail(client.email, otp);

    await mailService.sendActivationMail(
      client.email, // ✅ Foydalanuvchining emailini olish
      `${config.get("api_url")}/api/client/activate/${activation_link}`
    );
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

    res.status(201).send({ message: "Sizning emailingizga xabar jonatildi" });
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
  registerClient,
  updatePassword
};
