import { Request, Response, NextFunction } from "express";
import RequestService from "../services/RequestService";


export default class RequestController {
    public requestService = new RequestService();

    public getAllRequests = async (req: Request, res: Response, next: NextFunction) => {

    }

    public createRequest = async (req: Request, res: Response, next: NextFunction) => {

    }

    public deleteRequest = async (req: Request, res: Response, next: NextFunction) => {

    }

    public verifyRequest = async (req: Request, res: Response, next: NextFunction) => {

    }
}