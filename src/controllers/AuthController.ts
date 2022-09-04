import { Request, Response, NextFunction } from "express";
import { User } from "../db/models/User";
import { UserCreationDTO, UserLoginDto } from "../dtos/UserDto";
import { HttpException } from "../exceptions/HttpException";
import { RequestWithUser } from "../interfaces/AuthInterface";
import AuthService from "../services/AuthService";


export default class AuthController {
    public authService = new AuthService();

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: UserCreationDTO = req.body;
            userData.ktp_image = req.file;
            await this.authService.signUp(userData);

            res.status(201).json({ message: "Sign up successful" });
        }
        catch (err) {
            next(err);
        }
        
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: UserLoginDto = req.body;
            const loginData = await this.authService.logIn(userData)
            const access_token = loginData.access_token;

            res
                .cookie("access_token", access_token, {
                    httpOnly: true,
                    maxAge: 86400
                })
                .status(200)
                .json({ 
                    message: "Login successful",
                    access_token: access_token
                });
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    };

    public logOut = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.user) throw 0;
            res
                .clearCookie("access_token")
                .status(200)
                .json({ message: "Logout successful" });
        }
        catch (err) {
            next(err);
        }
    };

    public verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser: User = res.locals.user;
            if (!currentUser) throw 0;
            if (!currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const userId = req.params.id as unknown as number;
            const { accept }: { accept: boolean} = req.body;
            this.authService.verify(userId, accept);

            res.status(200).json({ message: "User verification successful" });
        }
        catch (err) {
            next(err);
        }
    }
}