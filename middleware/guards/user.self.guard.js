const errorHandler = require("../../helpers/error.handler");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  try {
    
    const id = req.params.id
    if (id != req.user.id) {
      return res.status(403).send({ message: "Faqat shaxsiy" });
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
  
};
