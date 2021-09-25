const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    phone: Joi.string().min(1).required(),
    favorite: Joi.boolean()
}).min(1);

const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required()
});

module.exports = {contactSchema, updateStatusContactSchema};