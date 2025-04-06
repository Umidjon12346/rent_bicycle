const Joi = require("joi");

exports.ownerValidation = (body) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Toliq ism matn bolishi kerak.",
      "string.empty": "Ism bosh bolmasligi kerak.",
      "string.min": "Ism kamida 3 ta belgidan iborat bolishi kerak.",
      "any.required": "Toliq ism majburiy.",
    }),

    phone: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Telefon raqam +998 bilan boshlanishi va 9 ta raqamdan iborat bolishi kerak.",
        "any.required": "Telefon raqam majburiy.",
      }),

    email: Joi.string().email().required().messages({
      "string.email": "Email notogri formatda.",
      "any.required": "Email majburiy.",
    }),

    password: Joi.string().min(6).required().messages({
      "string.min": "Parol kamida 6 ta belgidan iborat bolishi kerak.",
      "any.required": "Parol majburiy.",
    }),

    refresh_token: Joi.number().optional().messages({
      "number.base": "Refresh token raqam bolishi kerak.",
    }),

    is_active: Joi.boolean().optional(),

    activation_link: Joi.string().optional(),
  });

  return schema.validate(body);
};
