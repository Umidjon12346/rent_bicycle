const Joi = require("joi");

exports.reviewValidation = (body) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Baholash raqam bolishi kerak.",
      "number.min": "Minimum baho 1 bo'lishi kerak.",
      "number.max": "Maksimum baho 5 bo'lishi kerak.",
      "any.required": "Baholash (rating) majburiy.",
    }),

    comment: Joi.string().allow("").max(1000).messages({
      "string.max": "Kommentariy 1000 ta belgidan oshmasligi kerak.",
    }),

    client_id: Joi.number().required().messages({
      "number.base": "client_id raqam bolishi kerak.",
      "any.required": "Foydalanuvchi (client_id) kerak.",
    }),

    product_id: Joi.number().required().messages({
      "number.base": "product_id raqam bolishi kerak.",
      "any.required": "Mahsulot (product_id) kerak.",
    }),
  });

  return schema.validate(body);
};
