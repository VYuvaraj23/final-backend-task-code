import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
});

export {
  createUserSchema,
  updateUserSchema,
  signinSchema,
  forgetPasswordSchema,
  resetPasswordSchema
};
