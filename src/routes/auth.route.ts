import { Router } from "express";
import { signupController, loginController } from "../controllers/auth.controller";

const AuthGuard = Router();

AuthGuard.post('/signup', signupController);
AuthGuard.post('/login', loginController);