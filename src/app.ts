import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import access from "./routes/access.js";
import { errorHandler } from "./middleware/errorHandler.js";
export const db = drizzle(process.env.DB_FILE_NAME!);
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, PUT, GET,  DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(access);
app.use(errorHandler);
