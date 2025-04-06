const Joi = require("joi");

exports.locationValidation = (body) => {
  const schema = Joi.object({
    latitude: Joi.string().required().messages({
      "string.base": "Kenglik (latitude) matn korinishida bolishi kerak.",
      "any.required": "Kenglik majburiy.",
    }),

    longitude: Joi.string().required().messages({
      "string.base": "Uzunlik (longitude) matn korinishida bolishi kerak.",
      "any.required": "Uzunlik majburiy.",
    }),

    recorded_at: Joi.date().optional().messages({
      "date.base": "recorded_at sana formatida bo‘lishi kerak.",
    }),

    product_id: Joi.number().required().messages({
      "number.base": "Mahsulot ID raqam bo‘lishi kerak.",
      "any.required": "product_id majburiy.",
    }),

    client_id: Joi.number().required().messages({
      "number.base": "Mijoz ID raqam bo‘lishi kerak.",
      "any.required": "client_id majburiy.",
    }),
  });

  return schema.validate(body);
};
