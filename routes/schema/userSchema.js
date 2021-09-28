const Joi = require("joi");

const userSchemaVal = Joi.object({
    password: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    subscription: Joi.string(),
    token: Joi.string()
}).min(1);

module.exports = userSchemaVal;
