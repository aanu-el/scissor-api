import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const CreateUserSchema = Joi.object({
    firstName: Joi.string()
        .min(1)
        .max(10)
        .optional()
        .trim(),
    lastName: Joi.string()
        .min(1)
        .max(10)
        .optional()
        .trim(),
    email: Joi.string()
        .email()
        .trim()
        .required(),
    password: Joi.string()
        .trim()
        .required(),
    userUuid: Joi.string()
})

export async function CreateUserValidator(req: Request, res: Response, next: NextFunction) {
    const user = req.body

    try {
        await CreateUserSchema.validateAsync(user)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}
