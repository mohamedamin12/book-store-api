const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 250,
    unique: true
  },
  username:{
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  isAdmin:{
    type: Boolean,
    default: false,
  }
},
{
  timestamps: true,
}
)

const User = mongoose.model("User", userSchema);

// Validate Register User
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().required().trim().min(3).max(250).email(),
    username: Joi.string().required().trim().min(3).max(250),
    password: passwordComplexity.required().trim(),
  })
  return schema.validate(obj);
}
// Validate Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().required().trim().min(3).max(250).email(),
    password: Joi.string().required().min(8),

  })
  return schema.validate(obj);
}

// Validate Change Password
function validateChangePassword(obj) {
  const schema = Joi.object({
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(3).max(250).email(),
    username: Joi.string().trim().min(3).max(250),
    password: Joi.string().min(8),
  })
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateChangePassword,
}