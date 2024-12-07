import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertData, findEmail } from "../model/dbActions.js";
import { AppError } from "../model/appError.js";
import { IUser } from "../types/dbReturns.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email: string = req.body.email;
    const exist: IUser | null = await findEmail(email);
    if (exist) {
      throw new AppError("user error", 409, "Email already exists");
    }
    const password: string = req.body.password;
    const hashedPassword: string = bcrypt.hashSync(password, 12);
    const user = {
      ...req.body,
      age: +req.body.age,
      phoneNumber: +req.body.phoneNumber,
      password: hashedPassword,
      roleId: req.path.split("/")[1] === "customer" ? 1 : 2,
    };
    const result = await insertData("User", user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const email: string = req.body.email;
    const exist: IUser | null = await findEmail(email);
    if (!exist) {
      throw new AppError(
        "user error",
        400,
        "User with this email does not exist",
      );
    }
    const password: string = req.body.password;
    const hashedPassword: string = exist.password;
    const isMatch: boolean = bcrypt.compareSync(password, hashedPassword);
    if (!isMatch) {
      throw new AppError("user error", 409, "Incorrect password");
    }
    const token: string = jwt.sign(
      { userId: exist.userId, roleId: exist.roleId },
      process.env.SECRET_KEY as string,
    );
    res.status(200).json({ token, message: "Logged in" });
  } catch (error) {
    next(error);
  }
};
