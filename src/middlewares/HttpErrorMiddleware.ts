import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";


export const httpErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(error);
        const status: number = error.status;
        const message: string = error.message;

        res.status(status).json({ message });
    }
    catch (err) {
        next(err);
    }
};