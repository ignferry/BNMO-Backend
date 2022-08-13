import User from "../models/User";
import { HttpException } from  "../exceptions/HttpException"

export default class UserService {
    public async findUserById(userId: number): Promise<User> {
        const findUser: User | null = await User.findByPk(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        return findUser;
    }

    // public async createUser(userData: object) {
    //     if (lodash.isEmpty(userData)) throw new HttpException(400, "User data is empty");
        
    //     const createUserData: User = await User.create(userData);


    // }
}