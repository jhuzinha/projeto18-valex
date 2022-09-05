import joi from "joi";

const paymentSchema = joi.object({
    password: joi.string().regex(/^[0-9]{4}$/).required(),
    businessId: joi.number().required(),
    amount: joi.number().required()
})

export default paymentSchema;