
const jwt = require("jsonwebtoken");
const Owner = require("../../models/owner.model");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).send({ message: "Unauthorized! Token required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const owner = await Owner.findByPk(decoded.email); 

    if (!owner) {
      return res
        .status(403)
        .send({ message: "Access denied! Only Owners allowed." });
    }

    req.owner = owner; 
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};
