import { Request, Response, NextFunction } from "express";
import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { TransactionCreationDto } from "../dtos/TransactionDto";
import { HttpException } from "../exceptions/HttpException";
import TransferService from "../services/TransferService";


export default class TransferController {
    public transferService = new TransferService();

    public getAllTransfers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (!currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const page: number = req.query.page as unknown as number ? req.query.page as unknown as number : 1; 
            const pageSize: number = req.query.pagesize as unknown as number ? req.query.pagesize as unknown as number : 5;

            const transfers: Transaction[] = await this.transferService.findAllTransfers(page, pageSize);

            res.status(200).json(transfers);
        } catch (err) {
            next(err);
        }
    }

    public createTransfer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.user) throw 0;

            const transferData: TransactionCreationDto = req.body;
            const currentUser: User = res.locals.user as User;

            await this.transferService.createTransfer(transferData, currentUser);

            res.status(201).json({ message: "Transfer created successfully" });
        } catch (err) {
            next(err);
        }
    }
}