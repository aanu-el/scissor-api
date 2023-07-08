"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const class_validator_1 = require("class-validator");
class UserValidator {
}
__decorate([
    (0, class_validator_1.IsString)()
], UserValidator.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserValidator.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 10, {
        message: "username must between 2 and 10 characters long"
    })
], UserValidator.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)()
], UserValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 10, {
        message: "password must between 4 and 10 characters long"
    })
], UserValidator.prototype, "password", void 0);
exports.UserValidator = UserValidator;
