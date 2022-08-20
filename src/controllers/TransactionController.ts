import { Request, Response, NextFunction } from "express";
import { User } from "../db/models/User";
import TransactionService from "../services/TransactionService";


export default class TransactionController {
    public transactionService = new TransactionService();

    public getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.user) throw 0;
            const transactionId = Number(req.params.id);
            const currentUser = res.locals.user as User;

            const transaction = await this.transactionService.findTransactionById(transactionId, currentUser);

            res.status(200).json(transaction)
        } catch(err) {
            next(err);
        }
    }
}