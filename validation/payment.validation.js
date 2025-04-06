const Joi = require("joi");

exports.paymentValidation = (body) => {
  const schema = Joi.object({
    client_id: Joi.number().optional().messages({
      "number.base": "Client ID raqam bo'lishi kerak.",
    }),

    contract_id: Joi.number().optional().messages({
      "number.base": "Shartnoma ID raqam bo'lishi kerak.",
    }),

    amount: Joi.number().precision(2).required().messages({
      "number.base": "Tolov summasi raqam bo‘lishi kerak.",
      "any.required": "Tolov summasi majburiy.",
    }),

    payment_method: Joi.string().required().messages({
      "string.base": "Tolov usuli matn bo'lishi kerak.",
      "any.required": "Tolov usuli majburiy.",
    }),

    payment_time: Joi.date().optional().messages({
      "date.base": "Tolov vaqti notogri formatda.",
    }),

    status: Joi.string()
      .valid("pending", "completed", "failed", "refunded")
      .optional()
      .messages({
        "any.only":
          "Status quyidagilardan biri bolishi kerak: pending, completed, failed, refunded.",
        "string.base": "Status matn bolishi kerak.",
      }),
  });

  return schema.validate(body);
};
