const errorHandler = require("../../helpers/error.handler");
const jwt = require("jsonwebtoken");
const config = require("config");
const Client = require("../../models/client.model");
const jwtService = require("../../services/jwt.service");
module.exports = function (req, res, next) {
  try {
    const id = req.params.id;
    if (!req.user || req.user.role !== "client" || id != req.user.id) {
      return res.status(403).send({ message: "Faqat shaxsiy" });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

