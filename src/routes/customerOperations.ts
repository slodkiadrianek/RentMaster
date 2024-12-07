import express from "express";
import { loginVerifier } from "../middleware/loginVeriffier.js";
import {
  showReservations,
  showReservation,
} from "../controller/customerOperations.js";

const router = express.Router();

router.get("/customer/showReservations", loginVerifier, showReservations);
router.get("/customer/showReservation/:id", loginVerifier, showReservation);
export default router;
