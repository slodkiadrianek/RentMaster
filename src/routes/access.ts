import express, { Router } from "express";
import { validate } from "../middleware/validator.js";
import { register, login } from "../controller/access.js";

const router: Router = express.Router();

router.post("/customer/register", validate, register);

router.post("/customer/login", validate, login);

router.post("/customer/updateInformation", validate);

router.post("/employee/login", validate, login);
router.post("/employee/register", validate, login);
export default router;
