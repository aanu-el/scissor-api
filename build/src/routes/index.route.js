"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
const UrlRedirectRouter = (0, express_1.Router)();
UrlRedirectRouter.get("/:backHalf", index_controller_1.urlRedirect);
exports.default = UrlRedirectRouter;
