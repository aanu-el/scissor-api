import connection from "../../config/db.config";
import { DataTypes } from "sequelize";

const LinkModel = connection.define('Link',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userUuid: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customDomain: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        backHalf: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        finalUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        qrCode: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        clicks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestamps: true,
    }
)

export default LinkModel;

