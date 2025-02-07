const mongoose = require("mongoose");
const Joi = require("joi");
const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", AuthorSchema);

const validateCreateAuthor = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(3).max(100),
    lastName: Joi.string().min(3).max(100).trim().required(),
    nationality: Joi.string().required().trim().min(3).max(100),
    image: Joi.string(),
  });
  return schema.validate(obj);
};

const validateUpdateAuthor = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(100),
    lastName: Joi.string().trim().min(3).max(100),
    nationality: Joi.string().trim().min(3).max(100),
    image: Joi.string(),
  });
  return schema.validate(obj);
};

module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
};
