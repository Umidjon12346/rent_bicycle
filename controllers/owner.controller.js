const errorHandler = require("../helpers/error.handler");
const Owner = require("../models/owner.model");
const mailService = require("../services/mail.service");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const config = require("config");
const { ownerValidation } = require("../validation/owner.validation");

const addOwner = async (req, res) => {
  try {
    const { error, value } = ownerValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { full_name, phone, email, password, refresh_token, is_active } =
      value;
    const hashedpassword = bcrypt.hashSync(password, 7);
    const activation_link = uuid.v4();
    const newOwner = await Owner.create({
      full_name,
      phone,
      email,
      password: hashedpassword,
      refresh_token,
      is_active,
      activation_link,
    });

    await mailService.sendActivationMail(
      newOwner.email,
      `${config.get("api_url")}/api/owner/activate/${activation_link}`
    );
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
    const { error, value } = ownerValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { full_name, phone, email, password, refresh_token, is_active } =
      value;

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

const loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ where: { email } });
    if (!owner) {
      return res.status(400).send({ message: "owner not found" });
    }
    const valuePas = bcrypt.compareSync(password, owner.password);
    if (!valuePas) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const payload = {
      id: owner.id,
      email: owner.email,
      is_active: owner.is_active,
      role: "owner",
    };

    const tokens = jwtService.generateTokens(payload);
    owner.refresh_token = tokens.refreshToken;
    await owner.save();
    res.cookie("ownerRefreshToken", tokens.refreshToken, {
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

const logoutOwner = async (req, res) => {
  try {
    const { ownerRefreshToken } = req.cookies;
    console.log(ownerRefreshToken);

    if (!ownerRefreshToken) {
      return res.status(400).send({ message: "Token not provided" });
    }

    const owner = await Owner.findOne({
      where: { refresh_token: ownerRefreshToken },
    });
    if (!owner) {
      return res.status(400).send({ message: "Invalid token" });
    }

    owner.refresh_token = "";
    await owner.save();

    res.clearCookie("ownerRefreshToken");
    res.send({ message: "owner logout successful" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenOwner = async (req, res) => {
  try {
    const { ownerRefreshToken } = req.cookies;
    console.log(ownerRefreshToken);

    if (!ownerRefreshToken) {
      return res
        .status(400)
        .send({ message: "Tokening yoqqqkuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu" });
    }

    const owner = await Owner.findOne({
      where: { refresh_token: ownerRefreshToken },
    });
    if (!owner) {
      return res.status(400).send({ message: "bunday tokenligi yoqqq" });
    }
    const payload = {
      id: owner.id,
      email: owner.email,
      is_active: owner.is_active,
      role: "owner",
    };

    const tokens = jwtService.generateTokens(payload);
    owner.refresh_token = tokens.refreshToken;
    await owner.save();
    res.cookie("ownerRefreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.status(200).send({ message: "Yangi", accessToken: tokens.accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

const ownerActive = async (req, res) => {
  try {
    const user = await Owner.findOne({
      where: { activation_link: req.params.link },
    });
    if (!user) {
      return res.status(404).send({ message: "Owner not found" });
    }
    user.is_active = true;
    await user.save();
    res.send({
      message: "Owner activated successfully",
      status: user.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addOwner,
  getAllOwners,
  getOwnerById,
  deleteOwner,
  updateOwner,
  logoutOwner,
  loginOwner,
  refreshTokenOwner,
  ownerActive,
};
