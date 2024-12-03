import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import access from "./routes/access.js";
import { errorHandler } from "./middleware/errorHandler.js";
import customerOperations from "./routes/customerOperations.js";
export const app = express();
import { createClient } from "redis";

export const client = await createClient({
  url: "redis://192.168.0.100:6379",
})
  .on("error", (err): void => console.error("Redis Client Error", err))
  .connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, PUT, GET,  DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(access);
app.use(errorHandler);
app.use(customerOperations);
