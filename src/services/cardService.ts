import { findByApiKey } from '../repositories/companyRepository.js'
import { findByTypeAndEmployeeId, update } from '../repositories/cardRepository.js';
import { findByIdEmployee } from '../repositories/employeeRepository.js';
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import { TransactionTypes, Payment, Recharge } from '../types/cardTypes.js';
import { verifyNotFound } from '../utils/notFoundFunction.js';
import { insert } from '../repositories/cardRepository.js';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { findByCardIdPayments } from '../repositories/paymentRepository.js';
import { findByCardIdRecharges } from '../repositories/rechargeRepository.js';
import { verifyExpirationCard }  from './expirationCardService.js' 
import { cardValid } from './cardValidService.js'

dotenv.config();
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);
const {CRYPTR_KEY} = process.env;
const cryptr = new Cryptr(CRYPTR_KEY)


export async function cardCreation(apiKey: string | string[] | undefined, id: number, type: TransactionTypes) {
    const validateApi = await findByApiKey(apiKey)
    verifyNotFound(validateApi)
    const validateEmployee = await findByIdEmployee(id)
    verifyNotFound(validateEmployee)

    const existCard = await findByTypeAndEmployeeId(type, id)
    if(existCard){
        throw { type: "Conflict", message: "Card already exists"}
    }

    const number = faker.finance.creditCardNumber('####-####-####-####');
    const CVV = faker.finance.creditCardCVV();
    console.log(CVV)
    const securityCode = cryptr.encrypt(CVV)

    const nameEmployee = (validateEmployee.fullName).split(' ');
    const removeSmallNames = nameEmployee.filter((name) => name.length > 3)
    const cardName = removeSmallNames.map((name,index) => { 
        if(name.length > 3){
            if(index === 0 || index === removeSmallNames.length - 1){
                return name
            }
            return name[0]
        }
    })
    const cardholderName = cardName.join(" ")

    const expirationDate = dayjs().add(5, 'year').format("MM/YY")

    const data = {
        employeeId: id,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: false,
        type
    }

    await insert(data)
}

export async function cardActivate(id: number, password: string, cvv: string) {
    const validCard = await cardValid(id)

    verifyExpirationCard(validCard.expirationDate)

    if (validCard.isBlocked) {
        throw { type:"Bad Request" , message: "Cartão Bloqueado" }
    }
    
    if (validCard.password){
        throw { type:"Conflict" , message: "Senha já cadastrada" }
    }

    if (cvv != cryptr.decrypt(validCard.securityCode)){
        throw { type:"Unauthorized" , message: "Dados errados" }
    }

    const passwordCryp = bcrypt.hashSync(password, 10);
    await update(id, {password: passwordCryp})
}

export async function cardInformation(id: number){
    cardValid(id)
    const info = calcBalance(id)
    return info
}

export async function cardBlock(id: number, password: string){
    const validCard = await cardValid(id)
    verifyExpirationCard(validCard.expirationDate)
    if(validCard.isBlocked){
        throw {status: 'Bad Request', message: 'Cartão já bloqueado'}
    }
    if(!bcrypt.compareSync(password, validCard.password)){
        throw {status: 'Bad Request', message: 'Senha errada'}
    }
    await update(id, {isBlocked: true})

}

export async function cardUnlock(id: number, password: string){
    const validCard = await cardValid(id)
    verifyExpirationCard(validCard.expirationDate)
    if(!validCard.isBlocked){
        throw {status: 'Bad Request', message: 'Cartão não bloqueado'}
    }
    if(!bcrypt.compareSync(password, validCard.password)){
        throw {status: 'Bad Request', message: 'Senha errada'}
    }
    await update(id, {isBlocked: false})
}

export async function calcBalance(id: number){
    const payments = await findByCardIdPayments(id)
    const recharges = await findByCardIdRecharges(id)
    let balance: number = 0
    recharges.map((item: Payment) => balance += item.amount) 
    payments.map((item: Recharge) => balance -= item.amount)
    return {
        balance,
        payments,
        recharges
    }
}