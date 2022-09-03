import { Response, Request } from "express";
import { cardActivate, cardBlock, cardCreation, cardUnlock } from "../services/cardService.js";
import { TransactionTypes } from '../types/cardTypes.js';

export async function createCard(req: Request, res: Response) {
    const { "x-api-key": apiKey } = req.headers;
    const { type }:{type : TransactionTypes} = req.body;
    const id: number = Number(req.params.id);
    await cardCreation(apiKey, id, type)
    res.sendStatus(201)
}
 
interface Activate {
    'password': string, 
    'cvv': string
}

export async function ativateCard(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const body: Activate = req.body;
    await cardActivate(id, body.password, body.cvv)
    res.sendStatus(200)
}

export async function informationCard(req: Request, res: Response) {
    const id: number = Number(req.params.id);
}

export async function blockCard(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    await cardBlock(id)
}


export async function unlockCard(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    await cardUnlock(id)
}
