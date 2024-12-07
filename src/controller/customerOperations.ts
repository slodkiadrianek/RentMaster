import { AppError } from "../model/appError.js";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/db.js";
import { client } from "../app.js";
import { IUser, IReservation } from "../types/dbReturns.js";

export const showReservations = async (
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

export const showReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId: number = req.user.userId;
    const cache: string | null = await client.get(`reservation${id}`);
    if (cache) {
      res.status(200).json(JSON.parse(cache));
    } else {
      const reservation: IReservation | null =
        await prisma.reservation.findFirst({
          where: {
            reservationId: +id,
            userId: userId,
          },
          include: {
            Car: {
              include: {
                Manufacturer: true,
                CarType: true,
                Status: true,
                Location: true,
              },
            },
            User: true,
            ReservationStatus: true,
          },
        });
      if (!reservation) {
        throw new AppError("Not found", 405, "reservation not found");
      }
      res.status(200).json(reservation);
      await client.setEx(`reservation${id}`, 3600, JSON.stringify(reservation));
    }
  } catch (error) {
    next(error);
  }
};
