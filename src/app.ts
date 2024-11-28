import express from "express";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
export const db = drizzle(process.env.DB_FILE_NAME!);

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

