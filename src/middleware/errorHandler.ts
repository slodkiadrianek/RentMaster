import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { AppError } from "../model/appError.js";
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res
      .status(err.errorCode)
      .json({ TypeError: err.typeError, message: err.errorDescription });
  } else {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
