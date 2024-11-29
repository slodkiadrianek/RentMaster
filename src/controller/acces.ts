import { Request, Response, NextFunction } from "express";
import { userTable } from "../db/schema.js";
import bcrypt from "bcrypt";
import { insertData, findEmail } from "../model/dbActions.js";
import { AppError } from "../model/appError.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email: string = req.body.email;
    const exist = await findEmail(userTable, email);
    if (exist.length > 0) {
      throw new AppError("user error", 409, "Email already exists");
    }
    const password: string = req.body.password;
    const hashedPassword: string = bcrypt.hashSync(password, 12);
    const user = {
      ...req.body,
      password: hashedPassword,
      roleId: 1,
    };
    const result = await insertData(userTable, user);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
