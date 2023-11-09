const { Schema, model } = require("mongoose");
const handleMongoError = require('../helpers/handleMongoError')
const Joi = require("joi"
)

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required:[true, "You should enter at least 10 numbers"]
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

contactSchema.post("save", handleMongoError);

const requiredSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const optionalSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const schemas = {
  requiredSchema,
  optionalSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};