import { Request, Response, NextFunction } from "express";
import TransferService from "../services/TransferService";


export default class TransferController {
    public transferService = new TransferService();

    public getAllTransfers = async (req: Request, res: Response, next: NextFunction) => {

    }

    public createTransfer = async (req: Request, res: Response, next: NextFunction) => {

    }
}