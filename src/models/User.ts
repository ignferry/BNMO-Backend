import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../config/db.config"

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    declare name: string;
    declare ktp_image: string;
    declare balance: number;
    declare is_verified: CreationOptional<boolean>;
    declare is_admin: CreationOptional<boolean>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /\w+/i,
                len: [6, 12]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        ktp_image: {
            type: DataTypes.STRING
        },
        balance: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "users",
        sequelize
    }
);

export class UserCreationDTO {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public name: string,
        public ktp_image: string,
        public balance: number,
        public is_admin: boolean
    ) {}
}