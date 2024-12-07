import { Request, Response, NextFunction } from "express";

export const employeeVeriffier = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { roleId } = req.user;
  if (roleId === 1) {
    res
      .status(200)
      .send({ message: "You are not permitted to access employee services" });
  }
  next();
};
