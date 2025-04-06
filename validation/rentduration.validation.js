const Joi = require("joi");

exports.rentDurationValidation = (body) => {
  const schema = Joi.object({
    duration: Joi.number().positive().required().messages({
      "number.base": "Ijaraning davomiyligi raqam bo'lishi kerak.",
      "number.positive": "Davomiylik musbat raqam bo'lishi kerak.",
      "any.required": "Davomiylik (duration) majburiy maydon.",
    }),

    duration_type: Joi.string()
      .valid("soat", "kun", "oy", "yil")
      .required()
      .messages({
        "string.base": "Davomiylik turi matn bo'lishi kerak.",
        "any.only":
          "Davomiylik turi faqat 'soat', 'kun', 'oy', yoki 'yil' bo'lishi mumkin.",
        "any.required": "Davomiylik turi majburiy.",
      }),

    price: Joi.number().min(0).required().messages({
      "number.base": "Narx raqam bo'lishi kerak.",
      "number.min": "Narx manfiy bo'lishi mumkin emas.",
      "any.required": "Narx majburiy.",
    }),
  });

  return schema.validate(body);
};
