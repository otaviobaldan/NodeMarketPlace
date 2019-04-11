const joi = require('joi')

module.exports = {
  body: {
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .required()
      .min(6),
    name: joi.string().required()
  }
}
