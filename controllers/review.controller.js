const { errorHandler } = require("../helpers/error.handler");
const Review = require("../models/review.model");
const Client = require("../models/client.model");
const Product = require("../models/product.model");

const addReview = async (req, res) => {
  try {
    const { client_id, product_id, rating, comment } = req.body;
    const newReview = await Review.create({
      client_id,
      product_id,
      rating,
      comment,
    });
    res.status(201).send({ message: "Review created", newReview });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [Client, Product],
    });
    res.status(200).send({ reviews });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id, {
      include: [Client, Product],
    });
    res.status(200).send({ review });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, product_id, rating, comment } = req.body;

    await Review.update(
      {
        client_id,
        product_id,
        rating,
        comment,
      },
      { where: { id } }
    );

    res.status(200).send({ message: "Review updated" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.destroy({ where: { id } });
    res.status(200).send({ message: "Review deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
