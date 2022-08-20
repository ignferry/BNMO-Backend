import { Request, Response, NextFunction } from "express";
import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { TransactionCreationDto } from "../dtos/TransactionDto";
import { HttpException } from "../exceptions/HttpException";
import RequestService from "../services/RequestService";


export default class RequestController {
    public requestService = new RequestService();

    public getAllRequests = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (!currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const page: number = req.query.page as unknown as number ? req.query.page as unknown as number : 1; 
            const pageSize: number = req.query.pagesize as unknown as number ? req.query.pagesize as unknown as number : 5;

            const requests: Transaction[] = await this.requestService.findAllRequests(page, pageSize);

            res.status(200).json(requests);
        } catch (err) {
            next(err);
        }
    }

    public createRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.user) throw 0;

            const requestData: TransactionCreationDto = req.body;
            const currentUser: User = res.locals.user as User;

            await this.requestService.createRequest(requestData, currentUser);

            res.status(201).json({ message: "Request created successfully" });
        } catch (err) {
            next(err);
        }
    }

    public deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!res.locals.user) throw 0;

            const requestId = Number(req.params.id);
            const currentUser: User = res.locals.user as User;

            await this.requestService.deleteRequest(requestId, currentUser);

            res.status(200).json({ message: "Request deleted successfully" });
        } catch (err) {
            next(err);
        }
    }

    public verifyRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUser = res.locals.user as User;
            if (!currentUser) throw 0;
            if (!currentUser.is_admin) throw new HttpException(403, "Forbidden");

            const requestId = Number(req.params.id);
            const { status } = req.body;

            await this.requestService.verifyRequest(requestId, status)
        } catch (err) {
            next(err);
        }
    }
}