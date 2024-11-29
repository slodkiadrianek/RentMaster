import { db } from "../app.js";
import { eq } from "drizzle-orm";

export async function insertData(table: any, data: any) {
  const result = await db.insert(table).values(data).returning();
  return result;
}

export async function findEmail(table: any, email: any) {
  const result = await db.select().from(table).where(eq(table.email, email));
  return result;
}
