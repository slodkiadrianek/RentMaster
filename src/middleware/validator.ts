import validationSchemas from "./schema.js";
import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "joi";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema: ObjectSchema = validationSchemas[req.path.split("/")[2]];
  if (req.body.email) req.body.email = req.body.email.toLowerCase().trim();
  const result: ValidationResult = schema.validate(req.body);
  if (result.error) {
    res
      .status(400)
      .json({ message: "Invalid request", errors: result.error.details });
    return;
  }
  next();
};
