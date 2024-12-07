import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../model/appError.js";

export const loginVerifier = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError("Authorization error", 401, "No token provided");
  }
  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
    ) as JwtPayload;
    (req as Request & { user: unknown }).user = {
      userId: decoded.userId,
      roleId: decoded.roleId,
    };
    next();
  } catch (error) {
    next(error);
  }
};
