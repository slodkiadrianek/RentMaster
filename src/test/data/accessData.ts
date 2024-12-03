import { string } from "joi";

interface IRegisterUserData {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  surname: string;
  age: number;
  phoneNumber: number;
}

interface ILoginUserData {
  email: string;
  password: string;
}

export const registerUserData: IRegisterUserData = {
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  age: 30,
  password: "passSS123",
  phoneNumber: 123456789,
  repeatPassword: "passSS123",
};

export const loginUserData: ILoginUserData = {
  email: "john.doe@example.com",
  password: "passSS123",
};
