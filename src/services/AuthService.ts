import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { UserCreationDTO, UserLoginDto } from "../dtos/UserDto"
import { HttpException } from "../exceptions/HttpException";
import { User } from "../db/models/User";


export default class AuthService {
    public async signUp(userData: UserCreationDTO): Promise<void> {
        const userSameUsername: User | null = await User.findOne({
            where: {
                username: userData.username
            }
        });
        if (userSameUsername) throw new HttpException(409, "User with the same username already exists");

        const userSameEmail: User | null = await User.findOne({
            where: {
                email: userData.email
            }
        });
        if (userSameEmail) throw new HttpException(409, "User with the same email already exists");

        const hashedPassword = await hash(userData.password, 10);
        await User.create({ ...userData, password: hashedPassword });
    }

    public async logIn(userData: UserLoginDto): Promise<{access_token: string}> {
        const findUser: User | null = await User.findOne({
            where: {
                username: userData.username
            }
        });
        if (!findUser) throw new HttpException(409, "Invalid login credentials");
        if (!findUser.is_verified) throw new HttpException(403, "Unverified");
        
        const match = await compare(userData.password, findUser.password);
        if (!match) throw new HttpException(409, "Invalid login credentials");
        
        const token: string = await jwt.sign(
            { username: findUser.username },
            process.env.SECRET_KEY as string,
            { expiresIn: "24h" }
        );

        return {
            access_token: token
        };
    }

    public async verify(userId: number, accept: boolean): Promise<void> {
        const user: User | null = await User.findByPk(userId);
        if (!user) throw new HttpException(404, "User not found");
        if (user.is_verified) throw new HttpException(409, "User has been verified before");

        if (accept) {
            User.update({ is_verified: true }, { where: { id: userId } });
        }
        else {
            User.destroy({ where: { id: userId } });
        }
    }
}