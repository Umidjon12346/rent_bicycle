const Joi = require("joi");

exports.categoryValidation = (body) => {
  const categorySchema = Joi.object({
    name: Joi.string()
      .min(5)
      .message("5tadan kop yoz")
      .max(100)
      .message("yetadi ozi")
      .required()
      .messages({ "string.empty": "biror narsa deeeeeee" }),
  });
  return categorySchema.validate(body);
};
