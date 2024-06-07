import Joi from "joi";
import { PASSWORD_REGEX } from "../../utils/commonConstants";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(36).required()
})

export const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().regex(PASSWORD_REGEX).messages({ 'string.pattern.base': `min 8 words, 1 uppercase , 1 lowercase, 1 special Char` }),
    dob: Joi.string().required(),
    gender: Joi.string().required()
})

