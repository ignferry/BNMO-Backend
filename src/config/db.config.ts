import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config({path: './.env'});

const host = process.env.DB_HOST as string || "localhost";
const user = process.env.DB_USER as string || "root";
const password = process.env.DB_PASSWORD as string || "";
const name = process.env.DB_NAME as string || "testdb";
const dialect = process.env.DB_DIALECT as Dialect || "mysql" as Dialect;
const port = process.env.DB_PORT as unknown as number || 3306;

class SequelizeConnection {
    private static sequelizeConnection: Sequelize;

    public static getInstance(): Sequelize {
        if (!this.sequelizeConnection) {
            SequelizeConnection.sequelizeConnection = new Sequelize(name, user, password, {
                port: port,
                host: host,
                dialect: dialect
            });
        }
        return this.sequelizeConnection;
    }
}

export default SequelizeConnection.getInstance();
