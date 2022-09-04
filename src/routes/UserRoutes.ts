import { Router } from "express";
import { Routes } from "../interfaces/RouteInterface";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

export default class UserRoutes implements Routes {
    public path = "/users";
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}`, this.userController.getAllUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.userController.getUserById);
        this.router.get(`${this.path}/:id(\\d+)/requests`, authMiddleware, this.userController.getUserRequests);
        this.router.get(`${this.path}/:id(\\d+)/transfers`, authMiddleware, this.userController.getUserTransfers);
        this.router.get(`${this.path}/:id(\\d+)/transactions`, authMiddleware, this.userController.getUserTransactions);
    }
}