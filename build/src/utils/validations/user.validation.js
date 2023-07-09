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
exports.CreateUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const CreateUserSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .min(1)
        .max(10)
        .optional()
        .trim(),
    lastName: joi_1.default.string()
        .min(1)
        .max(10)
        .optional()
        .trim(),
    email: joi_1.default.string()
        .email()
        .trim()
        .required(),
    password: joi_1.default.string()
        .trim()
        .required(),
    userUuid: joi_1.default.string()
});
function CreateUserValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            yield CreateUserSchema.validateAsync(user);
            next();
        }
        catch (error) {
            next({
                message: error.details[0].message,
                status: 400
            });
        }
    });
}
exports.CreateUserValidator = CreateUserValidator;
