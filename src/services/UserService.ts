import { User } from "../db/models/User";
import { UserCreationDTO } from "../dtos/UserDto";
import { HttpException } from  "../exceptions/HttpException"
import { Op } from "sequelize";
import { hash } from "bcrypt";
import lodash from "lodash";

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

    public async createUser(userData: UserCreationDTO): Promise<void> {
        if (lodash.isEmpty(userData)) throw new HttpException(400, "User data is empty");

        const userSameCredentials: User | null = await User.findOne({ 
            where: {
                [Op.or]: [
                    { username: userData.username },
                    { email: userData.email }
                ]
            }
        });

        if (userSameCredentials) throw new HttpException(409, "User with the same username or email already exists");

        const hashedPassword = await hash(userData.password, 10);
        await User.create({...userData, password: hashedPassword});
    }

    public async updateUser(userId: number, userData: UserCreationDTO): Promise<void> {
        if (lodash.isEmpty(userData)) throw new HttpException(400, "User data is empty");

        const userToUpdate: User | null = await User.findByPk(userId);
        if (!userToUpdate) throw new HttpException(409, "User doesn't exist");

        const hashedPassword = await hash(userData.password, 10);
        await User.update({ ...userData, password: hashedPassword }, { where: {id: userId} });
    }

    public async deleteUser(userId: number): Promise<void> {
        const findUser: User | null = await User.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        await User.destroy({ where: { id: userId } })
    }
}