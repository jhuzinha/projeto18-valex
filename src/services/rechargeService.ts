import { insert } from "../repositories/rechargeRepository";
import { cardValid } from "./cardValidService.js";
import { verifyExpirationCard } from "./expirationCardService.js";
import { RechargeInsertData } from "../repositories/rechargeRepository.js";

export async function cardRecharges(id: number, value: number) {
    const validCard =  await cardValid(id)
    if(!validCard.password){
        throw { type:"Bad Request" , message: "Cartão não ativo" }
    }   
    verifyExpirationCard(validCard.expirationDate)
    
    const data: RechargeInsertData = {
        cardId:  validCard.id,
        amount: value
    }

    insert(data)

}