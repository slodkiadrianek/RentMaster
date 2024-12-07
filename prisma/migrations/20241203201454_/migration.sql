/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Reservation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "reservationId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "reservationStatusId" INTEGER NOT NULL,
    "handingOverDate" DATETIME NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("carId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_reservationStatusId_fkey" FOREIGN KEY ("reservationStatusId") REFERENCES "ReservationStatus" ("reservationStatusId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("carId", "endDate", "handingOverDate", "reservationId", "reservationStatusId", "startDate", "totalCost", "userId") SELECT "carId", "endDate", "handingOverDate", "reservationId", "reservationStatusId", "startDate", "totalCost", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
