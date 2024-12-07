/*
  Warnings:

  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `paymentMethodId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `transactionUrl` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PaymentMethod_paymentMethodName_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PaymentMethod";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "invoiceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationId" INTEGER NOT NULL,
    "invoiceUrl" TEXT NOT NULL,
    "issuedDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentStatusId" INTEGER NOT NULL,
    "paidDate" DATETIME NOT NULL,
    "transactionUrl" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    CONSTRAINT "Invoice_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_paymentStatusId_fkey" FOREIGN KEY ("paymentStatusId") REFERENCES "PaymentStatus" ("paymentStatusId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("currency", "dueDate", "invoiceId", "invoiceUrl", "issuedDate", "paidDate", "paymentStatusId", "reservationId", "totalCost") SELECT "currency", "dueDate", "invoiceId", "invoiceUrl", "issuedDate", "paidDate", "paymentStatusId", "reservationId", "totalCost" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_reservationId_key" ON "Invoice"("reservationId");
CREATE TABLE "new_Reservation" (
    "reservationId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "reservationStatusId" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,
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
