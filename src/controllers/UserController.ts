import { Request, Response, NextFunction } from "express";
import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { UserCreationDTO } from "../dtos/UserDto";
import { HttpException } from "../exceptions/HttpException";
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
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (userId != currentUser.id && !currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const user: User = await this.userService.findUserById(userId);

            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    };

    public getUserRequests = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (userId != currentUser.id && !currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const requests: Transaction[] = await this.userService.findUserRequests(userId);

            res.status(200).json(requests);
        }
        catch (err) {
            next(err);
        }
    }

    public getUserTransfers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (userId != currentUser.id && !currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const transfers: Transaction[] = await this.userService.findUserTransfers(userId);

            res.status(200).json(transfers);
        }
        catch (err) {
            next(err);
        }
    }

    public getUserTransactions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (userId != currentUser.id && !currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const transactions: Transaction[] = await this.userService.findUserTransactions(userId);

            res.status(200).json(transactions);
        }
        catch (err) {
            next(err);
        }
    }
}