import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import UserService from "../services/UserService";

export default class UserController {
    public userService = new UserService();

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const user: User = await this.userService.findUserById(userId);

            res.status(200).json({user});
        }
        catch (err) {
            next(err);
        }
    }
}