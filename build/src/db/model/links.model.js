"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../../config/db.config"));
const sequelize_1 = require("sequelize");
const Link = db_config_1.default.define('Link', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userUuid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    customDomain: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    backHalf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    finalUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    qrCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
});
exports.default = Link;
