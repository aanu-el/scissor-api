"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const links_controller_1 = require("../controllers/links.controller");
const LinksRouter = (0, express_1.Router)();
LinksRouter.get("/links", links_controller_1.getLinks);
exports.default = LinksRouter;
