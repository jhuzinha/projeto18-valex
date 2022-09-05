import joi from "joi";

const paymentSchema = joi.object({
    password: joi.string().length(4).required(),
    businessId: joi.number().required(),
    amount: joi.number().required()
})

export default paymentSchema;