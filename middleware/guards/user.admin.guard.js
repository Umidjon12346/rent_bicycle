const ApiError = require("../../helpers/api.error");

const { Admin } = require("../models"); // Admin modelini chaqiramiz
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).send({ message: "Unauthorized! Token required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res
        .status(403)
        .send({ message: "Access denied! Admin not found." });
    }

    req.admin = admin; 
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};
