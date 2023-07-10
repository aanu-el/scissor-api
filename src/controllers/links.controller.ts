import { RequestHandler } from "express";
import { LinkService } from "../services/links.service";
import LinkModel from "../db/model/links.model";
import { AuthService } from "../services/auth.service";
require('dotenv').config();

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
    const userUuid = user.userUuid;
    let base_domain = process.env.BASE_DOMAIN;

    let { url, customDomain = null, backHalf = null } = req.body;

    const validateUrl = await new LinkService().validateUrl(url); //==> validates the url

    if (!validateUrl) {
        return res.status(400).json({
            message: "Invalid URL"
        })
    }

    // Validate the custom domain if it's supplied by the user
    if (customDomain) {
        customDomain = customDomain.trim()
        const validateCustomDomain = await new LinkService().validateUrl(customDomain);
        if (!validateCustomDomain) {
            return res.status(400).json({
                message: "Invalid custom domain"
            })
        } else {
            base_domain = customDomain;
        }
    }

    // Make sure backHalf is unique if available. If not, generate a random string, 
    if (backHalf) {
        await LinkModel.findAll({ where: { backHalf: backHalf } })
            .then((link) => {
                if (link) {
                    return res.status(400).json({
                        message: "Back half already exists"
                    })
                }
            })
    } else {
        backHalf = new LinkService().randomstring();
    }

    const newLink: object = {
        url: url,
        backHalf: backHalf,
        userUuid: userUuid,
        customDomain: base_domain,
        finalUrl: `${base_domain}/${backHalf}`
    }

    // save to db
    await LinkModel.create({ newLink })
        .then((link) => {
            return res.status(201).json({
                message: "Successfully created link",
                data: link
            })
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "An error occurred", data: error })
        })
}

export const updateLink: RequestHandler = async (req, res, next) => {
    const link = req.body;

}

export const deleteLink: RequestHandler = async (req, res, next) => {
    const link = req.body;

}

