const { Schema, model } = require("mongoose");
const Joi = require("joi");
const {handleMongoError} = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    avatarURL: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongoError);

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const registerSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6),
  subscription: Joi.string().valid("starter", "pro", "business"),
  avatarURL: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  avatarURL: Joi.string(),
});
const updateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };