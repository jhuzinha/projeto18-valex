import card from "./cardRouter.js";
import { Router } from "express";

const router = Router();

router.use(card);

export default router;