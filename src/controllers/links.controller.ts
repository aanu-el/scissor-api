import { RequestHandler } from "express";
import { LinkService } from "../services/links.service";
import Link from "../db/model/links.model";

export const getLinks: RequestHandler = async (req, res, next) => {
    const allLinks = await Link.findAll();
    return res.status(200).json({
        message: "Success",
        data: allLinks
    })
}
