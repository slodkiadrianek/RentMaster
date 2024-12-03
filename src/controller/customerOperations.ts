import { AppError } from "../model/appError.js";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/db.js";
import { client } from "../app.js";

export const historyOfReservations = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId: number = req.user.userId;
    const cache: string | null = await client.get(
      `historyReservation${userId}`,
    );
    if (cache) {
      res.status(200).json(JSON.parse(cache));
    } else {
      const reservations = await prisma.reservation.findMany({
        where: {
          userId: userId,
        },
        include: {
          Car: true,
          User: true,
          ReservationStatus: true,
        },
      });
      res.status(200).json(reservations);
      await client.setEx(
        `historyReservation${userId}`,
        3600,
        JSON.stringify(reservations),
      );
    }
  } catch (error) {
    next(error);
  }
};
