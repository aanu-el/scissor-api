import { Router } from "express";
import { getLinks } from "../controllers/links.controller";



const LinksRouter = Router();

LinksRouter.get("/links", getLinks);


export default LinksRouter; 