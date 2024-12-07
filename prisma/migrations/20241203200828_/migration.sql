/*
  Warnings:

  - You are about to drop the column `carId` on the `Insurance` table. All the data in the column will be lost.

*/
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
    CONSTRAINT "Car_seatsId_fkey" FOREIGN KEY ("seatsId") REFERENCES "NumberOfSeats" ("seatsId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "Insurance" ("insuranceId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Car" ("carId", "carTypeId", "insuranceId", "licensePlate", "locationId", "manufacturerId", "model", "pricePerDay", "seatsId", "statusId", "transmissionId", "vin") SELECT "carId", "carTypeId", "insuranceId", "licensePlate", "locationId", "manufacturerId", "model", "pricePerDay", "seatsId", "statusId", "transmissionId", "vin" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");
CREATE UNIQUE INDEX "Car_insuranceId_key" ON "Car"("insuranceId");
CREATE TABLE "new_Insurance" (
    "insuranceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "insuranceProviderId" INTEGER NOT NULL,
    "insuranceTypeId" INTEGER NOT NULL,
    "validUntil" DATETIME NOT NULL,
    CONSTRAINT "Insurance_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider" ("insuranceProviderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Insurance_insuranceTypeId_fkey" FOREIGN KEY ("insuranceTypeId") REFERENCES "InsuranceType" ("insuranceTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Insurance" ("insuranceId", "insuranceProviderId", "insuranceTypeId", "validUntil") SELECT "insuranceId", "insuranceProviderId", "insuranceTypeId", "validUntil" FROM "Insurance";
DROP TABLE "Insurance";
ALTER TABLE "new_Insurance" RENAME TO "Insurance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
