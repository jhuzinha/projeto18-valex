import joi from "joi";

const passwordSchema = joi.object({
    'password': joi.string().regex(/^[0-9]{4}$/).required()
})

export default passwordSchema;