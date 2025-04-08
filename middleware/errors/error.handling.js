const ApiError = require("../../helpers/api.error");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res, next) {
  
  if (err instanceof ApiError) {
    
    return res.status(err.status).json(err.toJson());
  }

  if (err instanceof SyntaxError) {
    
    return res.status(err.status).json({ message: err.message });
  }
  logger.log(err);
  return res.status(500).json(ApiError.internal("Something went wrong"));
  
};
