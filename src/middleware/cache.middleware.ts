import { NextFunction, Request, Response } from "express";
import { client } from "../config/redis.config";
import { AuthService } from "../services/auth.service";


async function getCache(req: Request, res: Response, next: NextFunction) {
    const user = new AuthService().getUserFromToken(req.headers.authorization);
    const userUuid = user.userUuid;

    const id = req.params.id || null;

    if (id) {
        const cachedValue = await client.get(id)
        if (cachedValue) {
            return res.status(200).json({
                message: "Success",
                data: JSON.parse(cachedValue)
            })
        } else {
            next();
        }
    } else {
        const cachedValue = await client.get(userUuid)
        if (cachedValue) {
            return res.status(200).json({
                message: "Success",
                data: JSON.parse(cachedValue)
            })
        } else {
            next();
        }
    }
}

export default getCache;