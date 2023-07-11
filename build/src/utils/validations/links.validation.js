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
exports.CreateLinkValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const CreateLinkSchema = joi_1.default.object({
    url: joi_1.default.string()
        .required()
        .trim(),
    customDomain: joi_1.default.string()
        .optional()
        .trim(),
    backHalf: joi_1.default.string()
        .trim()
        .optional(),
    finalUrl: joi_1.default.string(),
    qrCode: joi_1.default.string()
        .trim(),
    userUuid: joi_1.default.string()
});
function CreateLinkValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            yield CreateLinkSchema.validateAsync(user);
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
exports.CreateLinkValidator = CreateLinkValidator;
