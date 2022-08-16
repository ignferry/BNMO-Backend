import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import { Routes } from "../interfaces/RouteInterface";


export default class TransactionRoutes implements Routes {
    public path = "/transactions";
    public router = Router();
    public transactionController = new TransactionController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id(\\d+)`, this.transactionController.getAllTransactions);
    }
}