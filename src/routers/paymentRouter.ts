import { Router } from "express";
import { validateValue } from "../middlewares/validateNumber.js";
import Validate from "../middlewares/joiValidateMiddlewares.js";
import { paymentCard } from "../controllers/cardPaymentController.js";

const payment = Router();

payment.post('/payment/:id/POS', Validate('payment'), validateValue, paymentCard)

export default payment;