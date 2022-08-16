import dotenv from 'dotenv';
import { Dialect, Sequelize, Model } from 'sequelize';
// import * as fs from "fs";
// import * as path from "path";
import sequelize from "../config/SequelizeConnection";
import User from "./User";
import Transaction from "./Transaction";

dotenv.config({path: './.env'});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  Transaction: Transaction(),
  User: User()
};

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default db;
