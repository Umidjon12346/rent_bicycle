const ApiError = require("../../helpers/api.error");


module.exports = function (req, res, next) {
  try {
    if (req.user?.role !== "owner") {
      throw ApiError.forbidden("Owner ");
    }
    next();
  } catch (error) {
    next(error);
  }
};
