const Joi = require("joi");

exports.contractValidation = (body) => {
  const schema = Joi.object({
    client_id: Joi.number().required().messages({
      "number.base": "client_id raqam bolishi kerak.",
      "any.required": "client_id majburiy.",
    }),

    product_id: Joi.number().required().messages({
      "number.base": "product_id raqam bolishi kerak.",
      "any.required": "product_id majburiy.",
    }),

    start_time: Joi.date().required().messages({
      "date.base": "start_time sana korinishida bolishi kerak.",
      "any.required": "start_time majburiy.",
    }),

    end_time: Joi.date().optional().messages({
      "date.base": "end_time sana korinishida bolishi kerak.",
    }),

    total_price: Joi.number().precision(2).optional().messages({
      "number.base": "total_price raqam bolishi kerak.",
    }),

    status_id: Joi.number().required().messages({
      "number.base": "status_id raqam bolishi kerak.",
      "any.required": "status_id majburiy.",
    }),

    duration_id: Joi.number().required().messages({
      "number.base": "duration_id raqam bolishi kerak.",
      "any.required": "duration_id majburiy.",
    }),
  });

  return schema.validate(body);
};
