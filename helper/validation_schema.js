const Joi = require("joi");

exports.addCustomerValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    phone: Joi.string().optional(),
  });
  return schema.validate(data);
};

//validation
exports.UserPasswordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });
  return schema.validate(data);
};

//profile
exports.UserProfileValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    phone: Joi.string().optional(),
    image: Joi.string().optional(),
  });
  return schema.validate(data);
};
