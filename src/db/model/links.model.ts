import connection from "../../config/db.config";
import { DataTypes } from "sequelize";

const Link = connection.define('Link',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userUuid: {
            type: DataTypes.STRING,
            allowNull: true,
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
        },
        finalUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        qrCode: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: true,
    }
)

export default Link;

