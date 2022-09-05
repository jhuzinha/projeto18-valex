import { Router } from "express";
import { validateValue } from "../middlewares/validateNumber.js";

const payment = Router();

payment.post('/payment/:id/POS', validateValue, )

export default payment;