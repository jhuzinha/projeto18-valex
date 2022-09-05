import { Router } from "express";
import { validateValue } from "../middlewares/validateNumber.js";
import { rechargesCard } from "../controllers/cardRechargesController.js";
import Validate from "../middlewares/joiValidateMiddlewares.js";

const recharge = Router();

recharge.post('/card/recharge/:id', Validate('recharge'), validateValue, rechargesCard)

export default recharge;