const joi = require('joi')

const contactSchema = joi.object({
  name: joi.string().required(),
  phone: joi.number().min(10),
  email: joi.string().required(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = { contactSchema, updateFavoriteSchema };