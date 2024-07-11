const Joi = require('joi');

const registerUser = Joi.object({
  profile_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phonenumber: Joi.string().required(),
  role: Joi.string().required().valid('admin', 'client', 'architect', 'builder'),
});

const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required().valid('admin', 'client', 'architect', 'builder'),
});

module.exports = {
  registerUser,
  loginUser,
};
