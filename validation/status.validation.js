const Joi = require("joi");

exports.statusValidation = (body) => {
  const statusSchema = Joi.object({
    status: Joi.string()
      .valid("pending", "completed", "failed", "refunded", "invalid")
      .optional()
      .messages({
        "any.only":
          "Status faqat: 'pending', 'completed', 'failed', yoki 'refunded' bo'lishi mumkin.",
        "string.base": "Status matn bo'lishi kerak.",
      }),
  });

  return statusSchema.validate(body);
};
