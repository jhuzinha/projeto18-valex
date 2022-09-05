import { Request, Response, NextFunction } from "express"

export function validateValue(req: Request, res: Response, next: NextFunction){
    const { amount } = req.body;
    if(Number(amount) <= 0) {
        throw {status: 'Bad Request', message: 'Valor inválido'}
    }
    next();
}