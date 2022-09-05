import { verifyNotFound } from "../utils/notFoundFunction.js";
import { findByIdCard } from "../repositories/cardRepository.js";


export async function cardValid(id: number){
    const validateCard = await findByIdCard(id)
    verifyNotFound(validateCard)
    return validateCard
}
