/*
  Warnings:

  - You are about to drop the `PaymentStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `paymentStatusId` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[carId]` on the table `Insurance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `insuranceId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PaymentStatus_paymentStatusName_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PaymentStatus";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "carId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturerId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "carTypeId" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "vin" TEXT NOT NULL,
    "transmissionId" INTEGER NOT NULL,
    "seatsId" INTEGER NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    CONSTRAINT "Car_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("manufacturerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType" ("carTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("statusId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("locationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "Transmission" ("transmissionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_seatsId_fkey" FOREIGN KEY ("seatsId") REFERENCES "NumberOfSeats" ("seatsId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("carId", "carTypeId", "licensePlate", "locationId", "manufacturerId", "model", "pricePerDay", "seatsId", "statusId", "transmissionId", "vin") SELECT "carId", "carTypeId", "licensePlate", "locationId", "manufacturerId", "model", "pricePerDay", "seatsId", "statusId", "transmissionId", "vin" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");
CREATE UNIQUE INDEX "Car_insuranceId_key" ON "Car"("insuranceId");
CREATE TABLE "new_Invoice" (
    "invoiceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationId" INTEGER NOT NULL,
    "invoiceUrl" TEXT NOT NULL,
    "issuedDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "paidDate" DATETIME NOT NULL,
    "transactionUrl" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    CONSTRAINT "Invoice_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("currency", "dueDate", "invoiceId", "invoiceUrl", "issuedDate", "paidDate", "reservationId", "totalCost", "transactionUrl") SELECT "currency", "dueDate", "invoiceId", "invoiceUrl", "issuedDate", "paidDate", "reservationId", "totalCost", "transactionUrl" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_reservationId_key" ON "Invoice"("reservationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_carId_key" ON "Insurance"("carId");
