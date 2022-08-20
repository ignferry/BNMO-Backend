import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Routes } from "../interfaces/RouteInterface";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { validationErrorMiddleware } from "../middlewares/ValidationErrorMiddleware";


export default class AuthRoutes implements Routes {
    public path = "";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/signup", this.authController.signUp, validationErrorMiddleware);
        this.router.post("/login", this.authController.logIn);
        this.router.post("/logout", authMiddleware, this.authController.logOut);
    }
}