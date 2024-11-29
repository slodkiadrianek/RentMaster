import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const userTable = sqliteTable("users_table", {
  userId: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  surname: text().notNull(),
  email: text().notNull().unique(),
  age: int().notNull(),
  phoneNumber: int().notNull(),
  roleId: int().notNull(),
  password: text().notNull(),
  created_at: int().$defaultFn(() => new Date().getTime()),
  updated_at: int().$onUpdateFn(() => new Date().getTime()),
});

export const userRoleTable = sqliteTable("user_roles_table", {
  roleId: int().primaryKey({ autoIncrement: true }),
  role_name: text().notNull().unique(),
});

export const carTable = sqliteTable("car_table", {
  carId: int().primaryKey({ autoIncrement: true }),
  manufacturerId: int().notNull(),
  model: text().notNull(),
  carTypeId: int().notNull(),
  licensePlate: text().notNull().unique(),
  statusId: int().notNull(),
  pricePerDay: int().notNull(),
  locationId: int().notNull(),
  vin: text().notNull(),
  transmissionId: int().notNull(),
  seatsId: int().notNull(),
});

export const serviceHistoryTable = sqliteTable("service_history_table", {
  serviceId: int().primaryKey({ autoIncrement: true }),
  carId: int().notNull(),
  date: text().notNull(),
  description: text().notNull(),
  cost: int().notNull(),
});

export const photosTable = sqliteTable("photos_table", {
  photoId: int().primaryKey({ autoIncrement: true }),
  carId: int().notNull(),
  photoUrl: text().notNull(),
});

export const insuranceTable = sqliteTable("insurance_table", {
  insuranceId: int().primaryKey({ autoIncrement: true }),
  insuranceProviderId: int().notNull(),
  insuranceTypeId: int().notNull(),
  validUntil: text().notNull(),
  carId: int().notNull(),
});

export const insuranceProviderTable = sqliteTable("insurance_provider_table", {
  insuranceProviderId: int().primaryKey({ autoIncrement: true }),
  providerName: text().notNull().unique(),
});

export const insuranceTypeTable = sqliteTable("insurance_type_table", {
  insuranceTypeId: int().primaryKey({ autoIncrement: true }),
  insuranceTypeName: text().notNull().unique(),
  description: text().notNull(),
});

export const numberOfSeatsTable = sqliteTable("number_of_seats_table", {
  seatsId: int().primaryKey({ autoIncrement: true }),
  numberOfSeats: int().notNull(),
});

export const locationTable = sqliteTable("location_table", {
  locationId: int().primaryKey({ autoIncrement: true }),
  locationName: text().notNull().unique(),
});

export const statusTable = sqliteTable("status_table", {
  statusId: int().primaryKey({ autoIncrement: true }),
  statusName: text().notNull().unique(),
});
export const carTypeTable = sqliteTable("car_type_table", {
  carTypeId: int().primaryKey({ autoIncrement: true }),
  carTypeName: text().notNull().unique(),
});

export const reservationTable = sqliteTable("reservation_table", {
  reservationId: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  carId: int().notNull(),
  startDate: text().notNull(),
  endDate: text().notNull(),
  totalCost: int().notNull(),
  reservationStatusId: int().notNull(),
  handingOverDate: text().notNull(),
});

export const invoiceTable = sqliteTable("invoice_table", {
  invoiceId: int().primaryKey({ autoIncrement: true }),
  reservationId: int().notNull(),
  invoiceUrl: text().notNull(),
  issuedDate: text().notNull(),
  dueDate: text().notNull(),
  currency: int().notNull(),
  paymentStatusId: int().notNull(),
  paidDate: text().notNull(),
  transactionId: int().notNull(),
  paymentMethodId: int().notNull(),
  totalCost: int().notNull(),
});

export const paymentStatusTable = sqliteTable("payment_status_table", {
  paymentStatusId: int().primaryKey({ autoIncrement: true }),
  paymentStatusName: text().notNull().unique(),
});

export const paymentMethodTable = sqliteTable("payment_method_table", {
  paymentMethodId: int().primaryKey({ autoIncrement: true }),
  paymentMethodName: text().notNull().unique(),
});

export const reservationStatusTable = sqliteTable("reservation_status_table", {
  reservationStatusId: int().primaryKey({ autoIncrement: true }),
  reservationStatusName: text().notNull().unique(),
});

export const manufacturerTable = sqliteTable("manufacturer_table", {
  manufacturerId: int().primaryKey({ autoIncrement: true }),
  manufacturerName: text().notNull().unique(),
});

export const transmissionTable = sqliteTable("transmission_table", {
  transmissionId: int().primaryKey({ autoIncrement: true }),
  transmissionName: text().notNull().unique(),
});

export const statusRelations = relations(statusTable, ({ many }) => ({
  carTable: many(carTable),
}));

export const carTypeRelations = relations(carTypeTable, ({ many }) => ({
  carTable: many(carTable),
}));

export const manufacturerRelations = relations(
  manufacturerTable,
  ({ one, many }) => ({
    carTable: many(carTable),
  })
);

export const locationRelations = relations(locationTable, ({ many }) => ({
  carTable: many(carTable),
}));

export const transmissionRelations = relations(
  transmissionTable,
  ({ many }) => ({
    carTable: many(carTable),
  })
);

export const seatRelations = relations(numberOfSeatsTable, ({ many }) => ({
  carTable: many(carTable),
}));

export const serviceHistoryRelations = relations(
  serviceHistoryTable,
  ({ one }) => ({
    car: one(carTable, {
      fields: [serviceHistoryTable.carId],
      references: [carTable.carId],
    }),
  })
);

export const insuranceProviderRelations = relations(
  insuranceProviderTable,
  ({ many }) => ({
    insuranceTable: many(insuranceTable),
  })
);

export const photosRelations = relations(photosTable, ({ one }) => ({
  car: one(carTable, {
    fields: [photosTable.carId],
    references: [carTable.carId],
  }),
}));

export const insuranceTypeRelations = relations(
  insuranceTypeTable,
  ({ many }) => ({
    insuranceTable: many(insuranceTable),
  })
);

export const paymentStatusRelations = relations(
  paymentStatusTable,
  ({ many }) => ({
    invoiceTable: many(invoiceTable),
  })
);

export const paymentMethodRelations = relations(
  paymentMethodTable,
  ({ many }) => ({
    invoiceTable: many(invoiceTable),
  })
);

export const invoiceRelations = relations(invoiceTable, ({ one }) => ({
  reservation: one(reservationTable, {
    fields: [invoiceTable.reservationId],
    references: [reservationTable.reservationId],
  }),
  paymentStatus: one(paymentStatusTable, {
    fields: [invoiceTable.paymentStatusId],
    references: [paymentStatusTable.paymentStatusId],
  }),
  paymentMethod: one(paymentMethodTable, {
    fields: [invoiceTable.paymentMethodId],
    references: [paymentMethodTable.paymentMethodId],
  }),
}));

export const insuranceRelations = relations(insuranceTable, ({ one }) => ({
  car: one(carTable, {
    fields: [insuranceTable.carId],
    references: [carTable.carId],
  }),
  insuranceProvider: one(insuranceProviderTable, {
    fields: [insuranceTable.insuranceProviderId],
    references: [insuranceProviderTable.insuranceProviderId],
  }),
  insuranceType: one(insuranceTypeTable, {
    fields: [insuranceTable.insuranceTypeId],
    references: [insuranceTypeTable.insuranceTypeId],
  }),
}));

export const reservationStatusRelations = relations(
  reservationStatusTable,
  ({ many }) => ({
    reservationTable: many(reservationTable),
  })
);

export const reservationRelations = relations(reservationTable, ({ one }) => ({
  car: one(carTable, {
    fields: [reservationTable.carId],
    references: [carTable.carId],
  }),
  user: one(userTable, {
    fields: [reservationTable.userId],
    references: [userTable.userId],
  }),
  reservationStatus: one(reservationStatusTable, {
    fields: [reservationTable.reservationStatusId],
    references: [reservationStatusTable.reservationStatusId],
  }),
  invoice: one(invoiceTable, {
    fields: [reservationTable.reservationId],
    references: [invoiceTable.reservationId],
  }),
}));

export const carRelations = relations(carTable, ({ one, many }) => ({
  manufacturer: one(manufacturerTable, {
    fields: [carTable.manufacturerId],
    references: [manufacturerTable.manufacturerId],
  }),
  carType: one(carTypeTable, {
    fields: [carTable.carTypeId],
    references: [carTypeTable.carTypeId],
  }),
  status: one(statusTable, {
    fields: [carTable.statusId],
    references: [statusTable.statusId],
  }),
  location: one(locationTable, {
    fields: [carTable.locationId],
    references: [locationTable.locationId],
  }),
  transmission: one(transmissionTable, {
    fields: [carTable.transmissionId],
    references: [transmissionTable.transmissionId],
  }),
  seats: one(numberOfSeatsTable, {
    fields: [carTable.seatsId],
    references: [numberOfSeatsTable.seatsId],
  }),
  serviceHistory: one(serviceHistoryTable, {
    fields: [carTable.carId],
    references: [serviceHistoryTable.carId],
  }),
  photos: many(photosTable),
  insurance: one(insuranceTable, {
    fields: [carTable.carId],
    references: [insuranceTable.insuranceId],
  }),
  reservation: one(reservationTable, {
    fields: [carTable.carId],
    references: [reservationTable.reservationId],
  }),
}));

export const roleRelations = relations(userRoleTable, ({ many }) => ({
  userTable: many(userTable),
}));

export const userRelations = relations(userTable, ({ one }) => ({
  role: one(userRoleTable, {
    fields: [userTable.roleId],
    references: [userRoleTable.roleId],
  }),
  reservation: one(reservationTable, {
    fields: [userTable.userId],
    references: [reservationTable.userId],
  }),
}));
