import express from "express";
import { validate } from "../middleware/validator.js";
import { register } from "../controller/acces.js";

const router = express.Router();

router.post("/register", validate, register as any);

router.post("/login");

router.post("/resetPassword");

export default router;
