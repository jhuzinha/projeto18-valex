import createSchema from './createSchema.js';
import activateCardSchema from "./activateCardSchema.js";
import { ObjectSchema } from 'joi';
import paymentCardSchema from './paymentCardSchema.js'
import rechargeSchema from './rechargeSchema.js';

interface AllSchemas {
    [key: string]: ObjectSchema
}

const allSchema: AllSchemas = {
    'create': createSchema,
    'activate': activateCardSchema,
    'payment': paymentCardSchema,
    'recharge': rechargeSchema
}

export default allSchema;