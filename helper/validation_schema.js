const Joi = require("joi");

exports.addCustomerValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
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
      id:Joi.number(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    image:Joi.string()
 
  });
  return schema.validate(data);
};
