import { cardValid } from "./cardValidService.js";
import { verifyExpirationCard } from "./expirationCardService.js";
import { findById } from "../repositories/businessRepository.js";
import bcrypt from 'bcrypt';
import { verifyNotFound } from "../utils/notFoundFunction.js";
import { calcBalance } from "./cardService.js";
import { insert } from "../repositories/paymentRepository.js";
import { PaymentInsertData } from "../repositories/paymentRepository.js";

export async function cardPayment(amount: number, password: string, businessId: number, id: number) {
    const validCard = await cardValid(id)
    verifyExpirationCard(validCard.expirationDate)
    if(!validCard.password){
        throw { type:"Bad Request" , message: "Cartão não ativo" }
    }
    if(!bcrypt.compareSync(password, validCard.password)){
        throw {type: 'Bad Request', message: 'Senha errada'}
    }
    const business = await findById(businessId)
    verifyNotFound(business)
    if (business.type !== validCard.type){
        throw {type: 'Bad Request', message: 'Cartão invalido nesse estabelecimento'}
    } 
    const info = await calcBalance(id)
    if(info.balance - amount < 0){
        throw {type: 'Bad Request', message: 'Saldo não suficiente'}
    }

    const data: PaymentInsertData = {
        businessId, 
        cardId: id,
        amount
    }

    insert(data)

}