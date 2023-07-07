import { Sequelize } from "sequelize";

require('dotenv').config();

const DB_USER: string = process.env.DB_USER as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
const DB_NAME: string = process.env.DB_NAME as string;
const DB_HOST: string = process.env.DB_HOST as string;

const connection = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false
}
);

export default connection;
