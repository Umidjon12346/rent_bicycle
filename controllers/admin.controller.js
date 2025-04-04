const { errorHandler } = require("../helpers/error.handler");
const Admin = require("../models/admin.model");

const addAdmin = async (req, res) => {
  try {
    const { full_name, email, password, refresh_token, is_creator, is_active } =
      req.body;
    const newAdmin = await Admin.create({
      full_name,
      email,
      password,
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
    const { full_name, email, password, refresh_token, is_creator, is_active } =
      req.body;

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

module.exports = {
    addAdmin,
    getAllAdmins,
    getAdminById,
    deleteAdmin,
    updateAdmin
}