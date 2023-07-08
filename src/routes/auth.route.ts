import { Router } from "express";
import { signupController, loginController } from "../controllers/auth.controller";

const Auth: Router = Router();

Auth.post('/signup', signupController);
Auth.post('/login', loginController);

export default Auth;