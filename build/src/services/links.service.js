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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkService = void 0;
const randomstring = require('randomstring');
class LinkService {
    randomstring() {
        return randomstring.generate({
            length: 6,
            charset: 'alphabetic'
        });
    }
    validateUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            url = url.trim();
            const resolveUrl = yield fetch(`https://networkcalc.com/api/dns/lookup/${url}`);
            const response = yield resolveUrl.json();
            if (response.status == "OK") {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.LinkService = LinkService;
