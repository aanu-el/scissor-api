"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLink = exports.updateLink = exports.createLink = exports.getLinkById = exports.getAllLinks = void 0;
const links_service_1 = require("../services/links.service");
const links_model_1 = __importDefault(require("../db/model/links.model"));
const auth_service_1 = require("../services/auth.service");
const getAllLinks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allLinks = yield links_model_1.default.findAll();
    return res.status(200).json({
        message: "Success",
        data: allLinks
    });
});
exports.getAllLinks = getAllLinks;
const getLinkById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield links_model_1.default.findOne({ where: { id: id } })
        .then((link) => {
        return res.status(200).json({
            message: "Success",
            data: link
        });
    }).catch((error) => {
        return res.status(500).json({
            message: "Error",
            error: error
        });
    });
});
exports.getLinkById = getLinkById;
const createLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new auth_service_1.AuthService().getUserFromToken(req.headers.authorization);
    const { url, customDomain = null, backHalf = null } = req.body;
    const validateUrl = yield new links_service_1.LinkService().validateUrl(url); //==> validates the url
    if (!validateUrl) {
        return res.status(400).json({
            message: "Invalid URL"
        });
    }
    // Make sure it is unique
    if (backHalf !== null) {
        yield links_model_1.default.findAll({ where: { backHalf: backHalf } })
            .then((link) => {
            if (link) {
                return res.status(400).json({
                    message: "Back half already exists"
                });
            }
        });
    }
});
exports.createLink = createLink;
const updateLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body;
});
exports.updateLink = updateLink;
const deleteLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body;
});
exports.deleteLink = deleteLink;
