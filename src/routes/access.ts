import express from "express";
import { validate } from "../middleware/validator.js";
import { register, login } from "../controller/access.js";

const router = express.Router();

router.post("/register", validate, register);

router.post("/login", validate, login);

export default router;
