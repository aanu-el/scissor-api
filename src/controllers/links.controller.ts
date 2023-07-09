import { RequestHandler } from "express";
import { LinkService } from "../services/links.service";
import LinkModel from "../db/model/links.model";
import { AuthService } from "../services/auth.service";

export const getAllLinks: RequestHandler = async (req, res, next) => {
    const allLinks = await LinkModel.findAll();
    return res.status(200).json({
        message: "Success",
        data: allLinks
    })
}

export const getLinkById: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    await LinkModel.findOne({ where: { id: id } })
        .then((link) => {
            return res.status(200).json({
                message: "Success",
                data: link
            })
        }).catch((error) => { 
            return res.status(500).json({
                message: "Error",
                error: error
            })
        })
}


export const createLink: RequestHandler = async (req, res, next) => {
    const user = new AuthService().getUserFromToken(req.headers.authorization);

    const { url, customDomain = null, backHalf = null } = req.body;

    const validateUrl = await new LinkService().validateUrl(url); //==> validates the url

    if (!validateUrl) {
        return res.status(400).json({
            message: "Invalid URL"
        })
    }

    // Make sure it is unique
    if (backHalf !== null) { 
        await LinkModel.findAll({ where: { backHalf: backHalf } })
          .then((link) => {
                if (link) {
                    return res.status(400).json({
                        message: "Back half already exists"
                    })
                }
            })
    }

}

export const updateLink: RequestHandler = async (req, res, next) => {
    const link = req.body;

}

export const deleteLink: RequestHandler = async (req, res, next) => {
    const link = req.body;

}

