const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Joi = require("joi");

const loginUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = { loginUserValidation };
