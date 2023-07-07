"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkService = void 0;
class LinkService {
    randomstring() {
        const randomstring = require('randomstring');
        return randomstring.generate({
            length: 6,
            charset: 'alphabetic'
        });
    }
}
exports.LinkService = LinkService;
