import { Request, Response } from "express";
import { cardRecharges } from "../services/rechargeService.js";

export async function rechargesCard(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const amount: number = Number(req.body.amount)
    await cardRecharges(id, amount)
    return res.sendStatus(200)
}
