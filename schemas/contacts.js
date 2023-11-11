const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().min(10),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = { contactSchema, updateFavoriteSchema }; 