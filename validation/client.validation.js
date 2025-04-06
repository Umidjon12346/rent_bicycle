const Joi = require("joi");

exports.clientValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(100).required().messages({
      "string.base": "Ism faqat matn bo‘lishi kerak.",
      "string.empty": "Ism bo‘sh bo‘lmasligi kerak.",
      "any.required": "Ism majburiy.",
    }),

    last_name: Joi.string().min(2).max(100).required().messages({
      "string.base": "Familiya faqat matn bo‘lishi kerak.",
      "string.empty": "Familiya bo‘sh bo‘lmasligi kerak.",
      "any.required": "Familiya majburiy.",
    }),

    phone: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Telefon raqami +998 bilan boshlanishi va 12 raqamdan iborat bo‘lishi kerak.",
        "any.required": "Telefon raqami majburiy.",
      }),

    passport: Joi.string().length(9).required().messages({
      "string.length": "Passport 9 belgidan iborat bo‘lishi kerak.",
      "any.required": "Passport majburiy.",
    }),

    email: Joi.string().email().optional().messages({
      "string.email": "Email noto‘g‘ri formatda.",
    }),

    password: Joi.string().min(6).required().messages({
      "string.min": "Parol kamida 6 belgidan iborat bo‘lishi kerak.",
      "any.required": "Parol majburiy.",
    }),

    refresh_token: Joi.string().optional(),

    is_active: Joi.boolean().optional(),

    activation_link: Joi.string().optional(),
  });

  return schema.validate(body);
};
