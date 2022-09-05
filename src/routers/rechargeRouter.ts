import { Router } from "express";
import { validateValue } from "../middlewares/validateNumber.js";

const recharge = Router();

recharge.post('/card/recharge/:id', validateValue,)

export default recharge;