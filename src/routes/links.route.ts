import { Router } from "express";
import { getAllLinks, getLinkById, createLink, updateLink, deleteLink } from "../controllers/links.controller";
import jwtAuth from "../middleware/auth.middleware";
import getCache from "../middleware/cache.middleware";



const LinksRouter: Router = Router();

LinksRouter.get("/links", [jwtAuth, getCache], getAllLinks);
LinksRouter.get("/links/:id", [jwtAuth, getCache], getLinkById);
LinksRouter.post("/links", jwtAuth, createLink);
LinksRouter.put("/links/:id", jwtAuth, updateLink);
LinksRouter.delete("/links/:id", jwtAuth, deleteLink);


export default LinksRouter; 