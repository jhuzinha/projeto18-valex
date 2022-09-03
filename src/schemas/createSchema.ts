import joi from "joi";

const createSchema = joi.object({
    'type': joi.string()
        .required()
        .valid("groceries","restaurant","transport","education","health")
})

export default createSchema;