import createSchema from './createSchema.js';
import activateCardSchema from "./activateCardSchema.js";
import { ObjectSchema } from 'joi';

interface AllSchemas {
    [key: string]: ObjectSchema
}

const allSchema: AllSchemas = {
    'create': createSchema,
    'activate': activateCardSchema
}

export default allSchema;