const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  try {
    if (req.user?.role !== "client") {
      throw ApiError.forbidden("Siz mijoz emassiz");
    }
    next();
  } catch (error) {
    next(error);
  }
};
