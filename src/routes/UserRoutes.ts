import { Router } from "express";
import { Routes } from "../interfaces/RouteInterface";
import UserController from "../controllers/UserController";

export default class UserRoutes implements Routes {
    public path = "/users";
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/:id(\\d+)`, this.userController.getUserById);
    }
}