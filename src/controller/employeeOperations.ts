import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/db.js";
import { AppError } from "../model/appError.js";
import { insertData } from "../model/dbActions.js";

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const car: { statusId: number; pricePerDay: number } | null =
      await prisma.car.findFirst({
        select: {
          statusId: true,
          pricePerDay: true,
        },
        where: { carId: +req.body.carId },
      });
    if (!car) {
      throw new AppError("Car error", 404, "Car not found");
    }
    const { statusId, pricePerDay }: { statusId: number; pricePerDay: number } =
      car;
    if (statusId === 1) {
      throw new AppError(
        "Car error",
        403,
        "Car is not available for reservation",
      );
    }
    const { startDate, endDate } = req.body;
    const daysAmount: number =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24) +
      1;
    const totalCost: number = daysAmount * pricePerDay;
    await insertData("reservation", {
      handingOverDate: new Date("1970-01-01T00:00:00.000Z"),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalCost,
      User: {
        connect: { userId: +req.body.userId }, // Ensure this ID exists in the User table
      },
      Car: {
        connect: { carId: +req.body.carId }, // Ensure this ID exists in the Car table
      },
      ReservationStatus: {
        connect: { reservationStatusId: 1 },
      },
    });
    res.status(201).json({
      status: "success",
      totalCost,
    });
  } catch (error) {
    next(error);
  }
};

export const endReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const reservationId: string = req.params.reservationId;
    const reservation: {
      ReservationStatus: {
        reservationStatusId: number;
        reservationStatusName: string;
      };
    } | null = await prisma.reservation.findFirst({
      where: {
        reservationId: +reservationId,
      },
      select: {
        ReservationStatus: true,
      },
    });
    if (!reservation) {
      throw new AppError("Reservation error", 404, "Reservation not found");
    }
  } catch (error) {
    next(error);
  }
};
