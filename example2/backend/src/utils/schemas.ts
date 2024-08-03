import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  image: Joi.string(),
})

const messagesSchema = Joi.object({
  message: Joi.string().required(),
  chatId: Joi.number().required(),
})

export {
  loginSchema,
  signupSchema,
  messagesSchema,
};
