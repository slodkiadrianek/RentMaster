-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole" ("roleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserRole" (
    "roleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Car" (
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
    CONSTRAINT "Car_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("manufacturerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType" ("carTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("statusId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("locationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "Transmission" ("transmissionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Car_seatsId_fkey" FOREIGN KEY ("seatsId") REFERENCES "NumberOfSeats" ("seatsId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceHistory" (
    "serviceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    CONSTRAINT "ServiceHistory_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("carId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photos" (
    "photoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carId" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    CONSTRAINT "Photos_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("carId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Insurance" (
    "insuranceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "insuranceProviderId" INTEGER NOT NULL,
    "insuranceTypeId" INTEGER NOT NULL,
    "validUntil" DATETIME NOT NULL,
    "carId" INTEGER NOT NULL,
    CONSTRAINT "Insurance_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider" ("insuranceProviderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Insurance_insuranceTypeId_fkey" FOREIGN KEY ("insuranceTypeId") REFERENCES "InsuranceType" ("insuranceTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Insurance_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("carId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InsuranceProvider" (
    "insuranceProviderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "providerName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InsuranceType" (
    "insuranceTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NumberOfSeats" (
    "seatsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberOfSeats" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "locationId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locationName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Status" (
    "statusId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statusName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CarType" (
    "carTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carTypeName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
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

-- CreateTable
CREATE TABLE "ReservationStatus" (
    "reservationStatusId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationStatusName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "manufacturerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manufacturerName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transmission" (
    "transmissionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transmissionName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationId" INTEGER NOT NULL,
    "invoiceUrl" TEXT NOT NULL,
    "issuedDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentStatusId" INTEGER NOT NULL,
    "paidDate" DATETIME NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    CONSTRAINT "Invoice_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("reservationId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_paymentStatusId_fkey" FOREIGN KEY ("paymentStatusId") REFERENCES "PaymentStatus" ("paymentStatusId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod" ("paymentMethodId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "paymentStatusId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentStatusName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "paymentMethodId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentMethodName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProvider_providerName_key" ON "InsuranceProvider"("providerName");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceType_name_key" ON "InsuranceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationName_key" ON "Location"("locationName");

-- CreateIndex
CREATE UNIQUE INDEX "Status_statusName_key" ON "Status"("statusName");

-- CreateIndex
CREATE UNIQUE INDEX "CarType_carTypeName_key" ON "CarType"("carTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationStatus_reservationStatusName_key" ON "ReservationStatus"("reservationStatusName");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_manufacturerName_key" ON "Manufacturer"("manufacturerName");

-- CreateIndex
CREATE UNIQUE INDEX "Transmission_transmissionName_key" ON "Transmission"("transmissionName");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentStatus_paymentStatusName_key" ON "PaymentStatus"("paymentStatusName");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_paymentMethodName_key" ON "PaymentMethod"("paymentMethodName");
