import joi from "joi";

const activateCardSchema = joi.object({
    'password': joi.string().regex(/^[0-9]{4}$/).required(),
    'cvv': joi.string().regex(/^[0-9]{3}$/).required()
})

export default activateCardSchema;