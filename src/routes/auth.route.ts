import { Router } from "express";
import { signupController, loginController } from "../controllers/auth.controller";
import { CreateUserValidator } from "../utils/validations/user.validation";

const Auth: Router = Router();

Auth.post('/signup', CreateUserValidator, signupController);
Auth.post('/login', loginController);

export default Auth;