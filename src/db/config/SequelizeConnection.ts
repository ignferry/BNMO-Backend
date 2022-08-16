import dotenv from 'dotenv';
import { Dialect, Sequelize, Model } from 'sequelize';
import dbConfig from "./config.json";

dotenv.config({path: './.env'});

class SequelizeConnection {
    private static sequelizeConnection: Sequelize;
  
    public static getInstance(): Sequelize {
        if (!this.sequelizeConnection) {
          const env: string = process.env.NODE_ENV || "development";
          let config;
          if (env == "production") {
            config = dbConfig.production;
          }
          else if (env == "test") {
            config = dbConfig.test;
          }
          else {
            config = dbConfig.development;
          }
  
          SequelizeConnection.sequelizeConnection = new Sequelize(config.database, config.username, config.password || "", {
              host: config.host,
              dialect: config.dialect as Dialect
          });
        }
        return this.sequelizeConnection;
    }
}

export default SequelizeConnection.getInstance();