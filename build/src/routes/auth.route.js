"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const Auth = (0, express_1.Router)();
Auth.post('/signup', auth_controller_1.signupController);
Auth.post('/login', auth_controller_1.loginController);
exports.default = Auth;
