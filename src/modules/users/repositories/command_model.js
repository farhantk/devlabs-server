const Joi = require('joi');

const registerUserSchema = Joi.object({
  profile_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phonenumber: Joi.string().required(),
});

module.exports = {
  registerUserSchema,
};
