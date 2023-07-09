"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
class AuthService {
    generateUUID() {
        return (0, uuid_1.v4)();
    }
    hash(password) {
        return bcrypt.hash(password, 10);
    }
    compare(password, password2) {
        return bcrypt.compare(password, password2);
    }
    jwtSign(body) {
        return jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: "48h" });
    }
    getUserFromToken(authorization) {
        const [_, token] = authorization.split(" ");
        const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return decodedToken.user;
    }
}
exports.AuthService = AuthService;
