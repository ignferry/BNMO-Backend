import { Request, Response, NextFunction } from "express";
import User, { UserCreationDTO } from "../models/User";
import UserService from "../services/UserService";

export default class UserController {
    public userService = new UserService();

    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: User[] = await this.userService.findAllUsers();

            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const user: User = await this.userService.findUserById(userId);

            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: UserCreationDTO = req.body;
            await this.userService.createUser(userData);

            res.status(200).json({ message: "User created successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const userData: UserCreationDTO = req.body;
            
            await this.userService.updateUser(userId, userData);

            res.status(200).json({ message: "User updated successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            
            await this.userService.deleteUser(userId);

            res.status(200).json({ message: "User deleted successfully" });
        }
        catch (err) {
            next(err);
        }
    }
}