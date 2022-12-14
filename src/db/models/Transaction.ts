import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/SequelizeConnection"
import { User } from "./User";

export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id: CreationOptional<number>;
    declare type: number;
    declare sender_id: ForeignKey<User['id']>;
    declare receiver_id: ForeignKey<User['id']>;
    declare amount: number;
    declare status: CreationOptional<number>;

    declare sender?: NonAttribute<User>;
    declare receiver?: NonAttribute<User>;
}

export default function (): typeof Transaction {
    Transaction.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            type: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
                validate: {
                    min: {
                        args: [0],
                        msg: "Type must be either 0 (request) or 1 (transfer)"
                    },
                    max: {
                        args: [1],
                        msg: "Type must be either 0 (request) or 1 (transfer)"
                    }
                },
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            status: {
                type: DataTypes.TINYINT,
                allowNull: false,
                validate: {
                    min: {
                        args: [-1],
                        msg: "Status must be either -1 (declined), 0 (pending), or 1 (accepted)"
                    },
                    max: {
                        args: [1],
                        msg: "Status must be either -1 (declined), 0 (pending), or 1 (accepted)"
                    }
                }
            }
        }, 
        {
            tableName: "transactions",
            sequelize
        }
    );

    return Transaction
}


