const  errorHandler  = require("../helpers/error.handler");
const Category = require("../models/category.model");
const { categoryValidation } = require("../validation/category.validation");

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { name  } = value;

    const newCategory = await Category.create({
      name
    });
    res.status(201).send({
      message: "Kategoriya muvaffaqiyatli yaratildi",
      category: newCategory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = categoryValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { name } = value;

    const updated = await Category.update(
      { name },
      {
        where: { id },
        returning: true,
      }
    );

    if (!updated) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ message: "Category updated successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
