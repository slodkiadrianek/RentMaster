import Joi, { ObjectSchema } from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().alphanum().min(8).max(30),
  age: Joi.number().required(),
  phoneNumber: Joi.number().required(),
  repeatPassword: Joi.ref("password"),
});

export default {
  register: registerSchema,
} as { [key: string]: ObjectSchema };
