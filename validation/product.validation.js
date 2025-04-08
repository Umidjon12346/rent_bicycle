const Joi = require("joi");

exports.productValidation = (body) => {
  const schema = Joi.object({
    model: Joi.string().min(2).max(100).required().messages({
      "string.base": "Model nomi matn bo'lishi kerak.",
      "string.min": "Model nomi kamida 2 ta belgidan iborat bo'lishi kerak.",
      "string.max": "Model nomi 100 ta belgidan oshmasligi kerak.",
      "any.required": "Model nomi majburiy.",
    }),

    status: Joi.string()
      .valid("pending", "completed", "failed", "refunded","invalid")
      .optional()
      .messages({
        "any.only":
          "Status faqat: 'pending', 'completed', 'failed', 'refunded' yoki 'invalid' bo'lishi mumkin.",
        "string.base": "Status matn bo'lishi kerak.",
      }),

    owner_id: Joi.number().required().messages({
      "number.base": "Egasining ID raqam bo'lishi kerak.",
      "any.required": "Egasining ID (owner_id) majburiy.",
    }),

    category_id: Joi.number().required().messages({
      "number.base": "Kategoriya ID raqam bo'lishi kerak.",
      "any.required": "Kategoriya ID (category_id) majburiy.",
    }),
  });

  return schema.validate(body);
};
