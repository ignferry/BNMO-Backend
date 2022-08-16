import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes, HasManyGetAssociationsMixin, Association } from "sequelize";
import sequelize from "../config/SequelizeConnection";
import { Transaction } from "./Transaction";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;
    declare name: string;
    declare ktp_image: string;
    declare balance: number;
    declare is_verified: CreationOptional<boolean>;
    declare is_admin: CreationOptional<boolean>;

    declare static associations: {
        sentTransactions: Association<User, Transaction>,
        receivedTransactions: Association<User, Transaction>
    }
}

export default function (): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    is: {
                        args: /\w+/i,
                        msg: "username should only contain alphanumerical characters and '_'"
                    },
                    len: {
                        args: [6, 12],
                        msg: "username should be between 6-12 characters long"
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            ktp_image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            balance: {
                type: DataTypes.BIGINT.UNSIGNED,
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

    User.hasMany(Transaction, {
        as: "receivedTransactions",
        sourceKey: "id",
        foreignKey: "sender_id"
    });
    
    User.hasMany(Transaction, {
        as: "sentTransactions",
        sourceKey: "id",
        foreignKey: "receiver_id"
    });
    
    Transaction.belongsTo(User, {
        as: "sender",
        foreignKey: "sender_id"
    });
    
    Transaction.belongsTo(User, {
        as: "receiver",
        foreignKey: "receiver_id"
    });

    return User
}