const errorHandler = require("../helpers/error.handler");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const config = require("config");
const jwtService = require("../services/jwt.service");
const { adminValidation } = require("../validation/admin.validation");

const addAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { full_name, email, password, refresh_token, is_creator, is_active } =
      value;

    const hashedpassword = bcrypt.hashSync(password, 7);
    const newAdmin = await Admin.create({
      full_name,
      email,
      password: hashedpassword,
      refresh_token,
      is_creator,
      is_active,
    });
    res.status(201).send({ message: "Admin created", newAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).send({ admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = adminValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { full_name, email, password, refresh_token, is_creator, is_active } =
      value;

    await Admin.update(
      { full_name, email, password, refresh_token, is_creator, is_active },
      { where: { id } }
    );
    res.status(200).send({ message: "Admin updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.destroy({ where: { id } });
    res.status(200).send({ message: "Admin deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).send({ message: "Admin not found" });
    }
    const valuePas = bcrypt.compareSync(password, admin.password);
    if (!valuePas) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: "admin",
    };

    const tokens = jwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("adminRefreshToken", tokens.refreshToken, {
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

const logoutAdmin = async (req, res) => {
  try {
    const { adminRefreshToken } = req.cookies;
    console.log(adminRefreshToken);

    if (!adminRefreshToken) {
      return res.status(400).send({ message: "Token not provided" });
    }

    const admin = await Admin.findOne({
      where: { refresh_token: adminRefreshToken },
    });
    if (!admin) {
      return res.status(400).send({ message: "Invalid token" });
    }

    admin.refresh_token = "";
    await admin.save();

    res.clearCookie("adminRefreshToken");
    res.send({ message: "Admin logout successful" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenAdmin = async (req, res) => {
  try {
    const { adminRefreshToken } = req.cookies;
    console.log(adminRefreshToken);

    if (!adminRefreshToken) {
      return res
        .status(400)
        .send({ message: "Tokening yoqqqkuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu" });
    }

    const admin = await Admin.findOne({
      where: { refresh_token: adminRefreshToken },
    });
    if (!admin) {
      return res.status(400).send({ message: "bunday tokenligi yoqqq" });
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: "admin",
    };

    const tokens = jwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("adminRefreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.status(200).send({ message: "Yangi", accessToken: tokens.accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
  updateAdmin,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
};
