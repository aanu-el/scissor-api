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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
require("dotenv").config();
function jwtAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send("Unauthorized");
        }
        const [_, token] = authorization.split(" ");
        try {
            const isValid = jwt.verify(token, process.env.JWT_SECRET);
            if (isValid) {
                next();
            }
            else {
                res.status(401).json({ status: "Unauthorized", message: "Invalid token provided" });
            }
        }
        catch (err) {
            console.log(err);
            res.status(401).json("unauthorized");
            return;
        }
    });
}
exports.default = jwtAuth;
