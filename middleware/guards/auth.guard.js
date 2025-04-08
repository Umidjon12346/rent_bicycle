const jwt = require("jsonwebtoken");
const config = require("config");
const jwtService = require("../../services/jwt.service");
const  errorHandler  = require("../../helpers/error.handler");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    
    if (!authorization) {
      return res.status(403).send({ meesage: "Token yoqkuuu yaxshilab qara" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      return res.status(403).send({ meesage: "Token yoqkuuu" });
    }
    const decodedToken = await jwtService.verifyAccessToken(token);
    console.log(decodedToken);
    req.user = decodedToken
    console.log(req.user);
    

    next();
  } catch (error) {
    errorHandler(error, res);
  }
  
};
