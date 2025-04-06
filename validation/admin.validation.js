const Joi = require("joi");

exports.adminValidation = (body) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": "To‘liq ism majburiy.",
      "string.min": "To‘liq ism kamida 3 ta belgidan iborat bo‘lishi kerak.",
      "string.max": "To‘liq ism 100 ta belgidan oshmasligi kerak.",
    }),

    email: Joi.string().email().required().messages({
      "string.email": "Email manzili noto‘g‘ri.",
      "any.required": "Email majburiy.",
      "string.empty": "Email bo‘sh bo‘lmasligi kerak.",
    }),

    password: Joi.string().min(6).required().messages({
      "string.empty": "Parol bo‘sh bo‘lmasligi kerak.",
      "string.min": "Parol kamida 6 ta belgidan iborat bo‘lishi kerak.",
    }),

    refresh_token: Joi.string().optional(),

    is_creator: Joi.boolean().optional(),

    is_active: Joi.boolean().optional(),
  });

  return schema.validate(body);
};
