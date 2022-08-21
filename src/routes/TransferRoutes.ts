import { Router } from "express";
import TransferController from "../controllers/TransferController";
import { Routes } from "../interfaces/RouteInterface";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { validationErrorMiddleware } from "../middlewares/ValidationErrorMiddleware";


export default class TransferRoutes implements Routes {
    public path = "/transfers";
    public router = Router();
    public transferController = new TransferController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.transferController.getAllTransfers);
        this.router.post(`${this.path}`, authMiddleware, this.transferController.createTransfer, validationErrorMiddleware);
    }
}