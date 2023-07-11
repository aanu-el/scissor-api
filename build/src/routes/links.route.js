"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const links_controller_1 = require("../controllers/links.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const LinksRouter = (0, express_1.Router)();
LinksRouter.get("/links", auth_middleware_1.default, links_controller_1.getAllLinks);
LinksRouter.get("/links/:id", auth_middleware_1.default, links_controller_1.getLinkById);
LinksRouter.post("/links", auth_middleware_1.default, links_controller_1.createLink);
LinksRouter.put("/links/:id", auth_middleware_1.default, links_controller_1.updateLink);
LinksRouter.delete("/links/:id", auth_middleware_1.default, links_controller_1.deleteLink);
exports.default = LinksRouter;
