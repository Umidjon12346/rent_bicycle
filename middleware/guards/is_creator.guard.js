const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  try {
    if (!req.user.is_creator) {
      throw ApiError.forbidden("Siz super admin emassiz");
    }
    next();
  } catch (error) {
    next(error);
  }
};
