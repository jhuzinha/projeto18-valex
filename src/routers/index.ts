import card from "./cardRouter.js";
import { Router } from "express";
import recharge from "./rechargeRouter.js";
import payment from "./paymentRouter.js";

const router = Router();

router.use(card);
router.use(recharge);
router.use(payment);

export default router;