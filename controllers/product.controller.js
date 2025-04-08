const  errorHandler  = require("../helpers/error.handler");
const Category = require("../models/category.model");
const Owner = require("../models/owner.model");
const Product = require("../models/product.model");
const { productValidation } = require("../validation/product.validation");

const addProduct = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { owner_id, category_id, model, status } = value;
    const newProduct = await Product.create({
      owner_id,
      category_id,
      model,
      status,
    });
    res.status(201).send({ message: "Product created", newProduct });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({include:[Owner,Category]});
    res.status(200).send({ products });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getMyProducts = async (req, res) => {
  try {
    const ownerId = req.user.id; 
    const products = await Product.findAll({
      where: { owner_id: ownerId },
      include: [Owner, Category],
    });

    res.status(200).send({ products });
  } catch (error) {
    errorHandler(error, res);
  }
};


const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.status(200).send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = productValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { owner_id, category_id, model, status } = value;

    await Product.update(
      {
        owner_id,
        category_id,
        model,
        status,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Product updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts
};
