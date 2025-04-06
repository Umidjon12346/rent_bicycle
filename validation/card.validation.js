const Joi = require("joi");

exports.cardValidation = (body) => {
  const schema = Joi.object({
    number: Joi.string()
      .pattern(/^\d{16}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Karta raqami 16 ta raqamdan iborat bolishi kerak.",
        "any.required": "Karta raqami majburiy.",
        "string.empty": "Karta raqami bosh bolmasligi kerak.",
      }),

    date: Joi.string()
      .pattern(/^(0[1-9]|1[0-2])([0-9]{2})$/) 
      .required()
      .messages({
        "string.pattern.base":
          "Karta muddati MMYY formatda bolishi kerak. (masalan: 0527)",
        "any.required": "Muddati majburiy.",
        "string.empty": "Muddati bosh bolmasligi kerak.",
      }),

    card_type: Joi.string()
      .optional()
      .valid("HUMO", "UZCARD", "VISA", "MASTER") 
      .messages({
        "any.only": "Faqat HUMO, UZCARD, VISA yoki MASTER bolishi mumkin.",
      }),

    client_id: Joi.number().required().messages({
      "number.base": "client_id son bo‘lishi kerak.",
      "any.required": "client_id majburiy.",
    }),
  });

  return schema.validate(body);
};
