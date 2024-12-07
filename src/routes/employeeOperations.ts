import express, { Router } from "express";
import { employeeVeriffier } from "../middleware/employeeVeriffier.js";
import { createReservation } from "../controller/employeeOperations.js";
import { loginVerifier } from "../middleware/loginVeriffier.js";

const router: Router = express.Router();

router.post(
  "/emoloyee/resevation/create",
  loginVerifier,
  employeeVeriffier,
  createReservation,
);

export default router;
