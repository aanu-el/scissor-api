import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const CreateLinkSchema = Joi.object({
    url: Joi.string()
        .required()
        .trim(),
    customDomain: Joi.string()
        .optional()
        .trim(),
    backHalf: Joi.string()
        .trim()
        .optional(),
    finalUrl: Joi.string(),
    qrCode: Joi.string()
        .trim(),
    userUuid: Joi.string()
})

const UpdateLinkSchema = Joi.object({
    backHalf: Joi.string()
        .trim() 
        .required()
})

export async function CreateLinkValidator(req: Request, res: Response, next: NextFunction) {
    const user = req.body

    try {
        await CreateLinkSchema.validateAsync(user)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

export async function UpdateLinkValidator(req: Request, res: Response, next: NextFunction) {
    const user = req.body

    try {
        await UpdateLinkSchema.validateAsync(user)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}
