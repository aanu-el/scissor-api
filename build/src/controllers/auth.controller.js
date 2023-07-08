"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signupController = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupController = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
};
exports.signupController = signupController;
const loginController = (req, res, next) => {
};
exports.loginController = loginController;
