import { User } from "../db/models/User";
import { UserCreationDTO } from "../dtos/UserDto";
import { HttpException } from  "../exceptions/HttpException"
import { Op } from "sequelize";
import { hash } from "bcrypt";
import lodash from "lodash";
import { Transaction } from "../db/models/Transaction";

export default class UserService {
    public async findAllUsers(): Promise<User[]> {
        const allUsers: User[] = await User.findAll({
            attributes: { exclude: ['password', 'ktp_image'] }
        });

        return allUsers;
    }

    public async findUserById(userId: number): Promise<User> {
        const findUser: User | null = await User.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        return findUser;
    }

    public async findUserRequests(userId: number): Promise<Transaction[]> {
        const findUser: User | null = await User.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        const requests: Transaction[] = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ],
                type: 0
            }
        });

        return requests;
    }

    public async findUserTransfers(userId: number): Promise<Transaction[]> {
        const findUser: User | null = await User.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        const requests: Transaction[] = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ],
                type: 1
            }
        });

        return requests;
    }

    public async findUserTransactions(userId: number): Promise<Transaction[]> {
        const findUser: User | null = await User.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        const requests: Transaction[] = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ],
            }
        });

        return requests;
    }
}