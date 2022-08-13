import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../config/db.config"

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare name: string;
    declare ktp_image: string;
    declare balance: number;
    declare is_verified: boolean;
    declare is_admin: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        ktp_image: {
            type: DataTypes.STRING
        },
        balance: {
            type: DataTypes.BIGINT
        },
        is_verified: {
            type: DataTypes.BOOLEAN
        },
        is_admin: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        tableName: "users",
        sequelize
    }
);