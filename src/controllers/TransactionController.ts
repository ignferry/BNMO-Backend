import { Request, Response, NextFunction } from "express";
import TransactionService from "../services/TransactionService";


export default class TransactionController {
    public transactionService = new TransactionService();

    public getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {

    }
}