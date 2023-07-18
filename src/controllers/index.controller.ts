import { RequestHandler } from "express";
import LinkModel from "../db/model/links.model";

require('dotenv').config();


export const urlRedirect: RequestHandler = async (req, res, next) => {
    const backHalf = req.params.backHalf.trim();

    try {
        const lookup = await LinkModel.findOne({ where: { backHalf: backHalf } });

        if (!lookup) return res.status(400).json({ message: "Not Found" });

        let url = lookup.dataValues.url;

        const clicks = lookup.dataValues.clicks + 1;

        await LinkModel.update({ clicks: clicks }, { where: { backHalf: backHalf } })

        res.redirect(301, url);
    } catch (error) {
        next({
            message: error,
            status: 500
        })
    }

}