export interface IUser {
  userId: number;
  name: string;
  surname: string;
  email: string;
  age: number;
  phoneNumber: number;
  roleId: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReservation {
  reservationId: number;
  userId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  reservationStatusId: number;
  handingOverDate: Date;
}
