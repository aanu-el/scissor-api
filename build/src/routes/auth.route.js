"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const AuthGuard = (0, express_1.Router)();
AuthGuard.post('/signup', auth_controller_1.signupController);
AuthGuard.post('/login', auth_controller_1.loginController);
