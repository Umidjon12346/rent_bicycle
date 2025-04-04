const ApiError = require("../../helpers/api.error");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin.model");
const config = require("config");
const { errorHandler } = require("../../helpers/error.handler");

module.exports = function (req, res, next) {
  if (!req.user.is_creator) {
    throw ApiError.forbidden("Kirmisan");
  }
  next();
};

