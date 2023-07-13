import { RequestHandler } from "express";
import { LinkService } from "../services/links.service";
import LinkModel from "../db/model/links.model";
import { AuthService } from "../services/auth.service";
require('dotenv').config();


export const urlRedirect: RequestHandler = async (req, res, next) => {
    const backHalf = req.params.backHalf.trim();

    const lookup = await LinkModel.findOne({ where: { backHalf: backHalf } });
   
    if (!lookup) return res.status(404).json({ message: "Not Found" });

    try {

        let url = lookup.dataValues.url;
        
        const clicks = lookup.dataValues.clicks + 1;

        await LinkModel.update({ clicks: clicks }, { where: { backHalf: backHalf } })
        
        res.redirect(301, url);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "An error occurred" });
    }

}