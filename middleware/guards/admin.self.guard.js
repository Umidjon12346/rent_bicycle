const ApiError = require("../../helpers/api.error");

module.exports = (req, res, next) => {
  try {
    const requestedId = parseInt(req.params.id); // yoki Number()
    const userId = req.user.id;

    if (requestedId !== userId) {
      throw ApiError.forbidden(
        "Faqat o'zingizning ma'lumotlaringizga ruxsat bor"
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
