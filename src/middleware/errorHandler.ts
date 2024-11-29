import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../model/appError.js";
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res
      .status(err.errorCode)
      .json({ TypeError: err.typeError, message: err.errorDescription });
  }
  // console.error(err);
};
