import { prisma } from "../utils/db.js";
import { PrismaClient } from "@prisma/client";
import { IUser } from "../types/dbReturns.js";

export async function insertData(table: string, data: any): Promise<object> {
  const result = await (prisma[table as keyof PrismaClient] as any).create({
    data: {
      ...data,
    },
  });
  return result;
}

export async function deleteData(table: string, id: number): Promise<void> {
  await (prisma[table as keyof PrismaClient] as any).delete({
    where: { id: id },
  });
}

export async function findEmail(email: string): Promise<IUser | null> {
  const result: IUser | null = await prisma.user.findFirst({
    where: { email: email },
  });
  return result;
}
