import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { Routes } from "../interfaces/RouteInterface";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { validationErrorMiddleware } from "../middlewares/ValidationErrorMiddleware";
import { fileUploadMiddleware } from "../middlewares/FileUploadMiddleware";


export default class AuthRoutes implements Routes {
    public path = "";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/signup", fileUploadMiddleware.single('ktp_image'), this.authController.signUp, validationErrorMiddleware);
        this.router.post("/login", this.authController.logIn);
        this.router.post("/logout", authMiddleware, this.authController.logOut);
        this.router.post("/verify/:id(\\d+)", authMiddleware, this.authController.verify);
    }
}