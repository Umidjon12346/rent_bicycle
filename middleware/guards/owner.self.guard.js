const ApiError = require("../../helpers/api.error");

module.exports = function (Model, idField = "id") {
  return async (req, res, next) => {
    try {
      const recordId = req.params[idField];
      const record = await Model.findByPk(recordId);

      if (!record) {
        throw ApiError.notFound("Ma'lumot topilmadi");
      }

      if (record.id !== req.user.id && record.owner_id !== req.user.id) {
        throw ApiError.forbidden("Ruxsat yo'q");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
