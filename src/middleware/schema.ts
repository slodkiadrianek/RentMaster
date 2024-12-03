import Joi, { ObjectSchema } from "joi";
import { login } from "../controller/access.js";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().alphanum().min(8).max(30),
  age: Joi.number().required(),
  phoneNumber: Joi.number().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().alphanum().min(8).max(30),
});

export default {
  register: registerSchema,
  login: loginSchema,
} as { [key: string]: ObjectSchema };
