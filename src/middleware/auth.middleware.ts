import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
require("dotenv").config()

async function jwtAuth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send("Unauthorized")
    }

    const [_, token] = authorization.split(" ")

    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET)

        if (isValid) {
            next()
        } else {
            res.status(401).send("Unauthorized")
        }

    } catch (err) {
        console.log(err)
        res.status(401).json("unauthorized")
        return
    }
}

export default jwtAuth;