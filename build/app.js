"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_config_1 = __importDefault(require("./src/config/db.config"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/api/v1', (req, res) => res.json({
    'status': 'success',
    'message': 'Welcome to Scissor'
}));
app.post('auth/login', (req, res) => {
});
db_config_1.default
    .sync()
    .then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
    console.log("Error", err);
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
