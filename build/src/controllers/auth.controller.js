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
exports.loginController = exports.signupController = void 0;
const user_model_1 = __importDefault(require("../db/model/user.model"));
const auth_service_1 = require("../services/auth.service");
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    // check is the user exists already
    const userExists = yield user_model_1.default.findOne({ where: { email: email } });
    if (userExists) {
        res.status(400).json({
            status: false, message: "User already exists"
        });
        return;
    }
    // Generate a UUID for the user
    const userUuid = new auth_service_1.AuthService().generateUUID();
    // hash user password
    const hashPass = yield new auth_service_1.AuthService().hash(password.trim());
    yield user_model_1.default.create({
        firstName: firstName.trim().toLowerCase(),
        lastName: lastName.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password: hashPass,
        userUuid: userUuid
    }).then((user) => {
        res.status(200).json({ status: 'success', data: user });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ status: false, data: error.message });
    });
});
exports.signupController = signupController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({
        where: { email: email }
    });
    if (!user) {
        res.status(404).json({ message: "User Not Found! Please sign up." });
        return;
    }
    const compare = yield new auth_service_1.AuthService().compare(password, user.dataValues.password);
    if (compare == false) {
        res.status(400).json({ status: "error", message: "Incorrect Password" });
        return;
    }
    const body = { userUuid: user.dataValues.userUuid, email: user.dataValues.email };
    const token = new auth_service_1.AuthService().jwtSign(body);
    res.status(200).json({ status: 'Success', message: 'Login successful', data: { token: token } });
});
exports.loginController = loginController;
