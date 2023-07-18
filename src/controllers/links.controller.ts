import { RequestHandler } from "express";

import { client } from "../config/redis.config";
import { LinkService } from "../services/links.service";
import LinkModel from "../db/model/links.model";
import { AuthService } from "../services/auth.service";

require('dotenv').config();


export const getAllLinks: RequestHandler = async (req, res, next) => {
    const user = new AuthService().getUserFromToken(req.headers.authorization);
    const userUuid = user.userUuid;

    const allLinks = await LinkModel.findAll({ where: { userUuid: userUuid } });

    // Save cached results to redis
    await client.setEx(userUuid, 3600, JSON.stringify(allLinks));

    return res.status(200).json({
        message: "Success",
        data: allLinks
    })
}

export const getLinkById: RequestHandler = async (req, res, next) => {
    const user = new AuthService().getUserFromToken(req.headers.authorization);
    const userUuid = user.userUuid;
    const id = req.params.id;

    const link = await LinkModel.findOne({ where: { id: id, userUuid: userUuid } })

    if (!link) {
        return res.status(400).json({ status: false, message: "Not Found! Invalid ID" })
    }

    // Save cached results to redis
    await client.set(id, JSON.stringify(link));

    return res.status(200).json({
        message: "Success",
        data: link
    })

}


export const createLink: RequestHandler = async (req, res, next) => {
    const user = new AuthService().getUserFromToken(req.headers.authorization);
    const userUuid = user.userUuid;
    let base_domain = process.env.BASE_DOMAIN;

    let { url, customDomain = null, backHalf = null } = req.body;

    //validates the url using networkcalc api
    const validateUrl = await new LinkService().validateUrl(url);

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
        let lookup = await LinkModel.findAll({ where: { backHalf: backHalf } })
        if (lookup.length > 0) {
            return res.status(400).json({
                message: "Back half already exists"
            })
        } else {
            backHalf = backHalf.trim()
        }
    } else {
        backHalf = new LinkService().randomstring();
    }

    const finalUrl = `${base_domain}/${backHalf}`

    // Generate QR code for the shortened url and upload to cloudinary
    const qrCode = await new LinkService().generateQR(finalUrl);

    // Save to db
    await LinkModel.create(
        {
            userUuid: userUuid,
            url: url,
            backHalf: backHalf,
            customDomain: base_domain,
            finalUrl: `${base_domain}/${backHalf}`,
            qrCode: qrCode
        })
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
    const user = new AuthService().getUserFromToken(req.headers.authorization);
    const userUuid = user.userUuid;
    const base_domain = process.env.BASE_DOMAIN;

    const id = req.params.id;
    const backHalf = req.body.backHalf

    try {
        let link = await LinkModel.findOne({ where: { id: id, userUuid: userUuid } })

        if (!link) {
            return res.status(404).json({ status: false, message: "link not found" })
        }

        const updatedUrl = `${base_domain}/${backHalf}`

        link.set({
            backHalf: backHalf,
            finalUrl: updatedUrl,
            qrCode: await new LinkService().generateQR(updatedUrl)
        })

        await link.save();

        return res.status(200).json({ status: true, data: link })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred'
        })
    }
}

export const deleteLink: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    const user = new AuthService().getUserFromToken(req.headers.authorization);
    const userUuid = user.userUuid;

    try {
        let link = await LinkModel.findOne({ where: { id: id, userUuid: userUuid } })

        if (!link) {
            return res.status(404).json({ status: false, message: "link not found" })
        }

        await link.destroy()
        return res.status(200).json({ status: true, message: "Link deleted", data: link })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'An error occurred'
        })
    }
}

