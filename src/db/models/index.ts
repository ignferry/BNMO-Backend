import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';
import * as fs from "fs";
import * as path from "path";
import dbConfig from "../config/config.json";

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

        SequelizeConnection.sequelizeConnection = new Sequelize(config.username, config.username, config.password || "", {
            host: config.host,
            dialect: config.dialect as Dialect
        });
      }
      return this.sequelizeConnection;
  }
}

let db = {
  sequelize: SequelizeConnection.getInstance(),
  Sequelize: Sequelize
};


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== "index.ts") && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))();
    db = { ...db, [model.name]: model };
  });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default db;
