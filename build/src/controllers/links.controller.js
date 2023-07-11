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
require('dotenv').config();
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
    const userUuid = user.userUuid;
    let base_domain = process.env.BASE_DOMAIN;
    let { url, customDomain = null, backHalf = null } = req.body;
    const validateUrl = yield new links_service_1.LinkService().validateUrl(url); //==> validates the url
    if (!validateUrl) {
        return res.status(400).json({
            message: "Invalid URL"
        });
    }
    // Validate the custom domain if it's supplied by the user
    if (customDomain) {
        customDomain = customDomain.trim();
        const validateCustomDomain = yield new links_service_1.LinkService().validateUrl(customDomain);
        if (!validateCustomDomain) {
            return res.status(400).json({
                message: "Invalid custom domain"
            });
        }
        else {
            base_domain = customDomain;
        }
    }
    // Make sure backHalf is unique if available. If not, generate a random string, 
    if (backHalf) {
        yield links_model_1.default.findAll({ where: { backHalf: backHalf } })
            .then((link) => {
            if (link) {
                return res.status(400).json({
                    message: "Back half already exists"
                });
            }
        });
    }
    else {
        backHalf = new links_service_1.LinkService().randomstring();
    }
    const newLink = {
        url: url,
        backHalf: backHalf,
        userUuid: userUuid,
        customDomain: base_domain,
        finalUrl: `${base_domain}/${backHalf}`
    };
    // save to db
    yield links_model_1.default.create({ newLink })
        .then((link) => {
        return res.status(201).json({
            message: "Successfully created link",
            data: link
        });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "An error occurred", data: error });
    });
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
