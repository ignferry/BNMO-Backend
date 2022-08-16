import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Routes } from "../interfaces/RouteInterface";


export default class AuthRoutes implements Routes {
    public path = "";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/signup", this.authController.signUp);
        this.router.post("/login", this.authController.logIn);
        this.router.post("/logout", this.authController.logOut);
    }
}