"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler = (statusCode, status, message, data = null) => {
    (res) => {
        return res.status(statusCode).send({
            status: status,
            message: message,
            data: data
        });
    };
};
exports.default = ResponseHandler;
