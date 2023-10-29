const joi = require('joi')

const contactSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().pattern(/[0-9]{3}-[0-9]{1}-[0-9]{3}-[0-9]{5}-[0-9]{1}/),
  email: joi.string().required(),
  favorite: joi.boolean(),
});

module.exports = contactSchema