import { Request, Response } from "express";
import { cardPayment } from "../services/paymentService.js";

export async function paymentCard(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const { amount, password, businessId }  = req.body;
    await cardPayment(Number(amount), password, Number(businessId), id)
    return res.sendStatus(200)
}