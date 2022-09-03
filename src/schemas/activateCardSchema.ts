import joi from "joi";

const activateCardSchema = joi.object({
    'password': joi.string().length(4).required(),
    'cvv': joi.string().required()
})

export default activateCardSchema;