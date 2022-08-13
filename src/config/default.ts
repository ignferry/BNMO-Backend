import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config({path: './.env'});

// DB CONFIG
const host = process.env.HOST as string || "localhost" as string;
const user = process.env.USER as string || "root" as string;
const password = process.env.PASSWORD as string || "" as string;
const db = process.env.DB as string || "testdb" as string;
const dialect = process.env.DIALECT as Dialect || "mysql" as Dialect;

const sequelizeConnection = new Sequelize(db, user, password, {
    host: host,
    dialect: dialect
});


export { sequelizeConnection };