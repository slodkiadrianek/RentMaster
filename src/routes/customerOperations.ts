import express from "express";
import { loginVerifier } from "../middleware/loginVeriffier.js";
import { historyOfReservations } from "../controller/customerOperations.js";

const router = express.Router();

router.get(
  "/customer/historyOfReservations",
  loginVerifier,
  historyOfReservations,
);

export default router;
