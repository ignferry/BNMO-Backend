import { Router } from "express";
import RequestController from "../controllers/RequestController";
import { Routes } from "../interfaces/RouteInterface";
import { authMiddleware } from "../middlewares/AuthMiddleware";


export default class RequestRoutes implements Routes {
    public path = "/requests";
    public router = Router();
    public requestController = new RequestController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.requestController.getAllRequests);
        this.router.post(`${this.path}`, authMiddleware, this.requestController.createRequest);
        this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.requestController.deleteRequest);
        this.router.put(`${this.path}/verify/:id(\\d+)`, authMiddleware, this.requestController.verifyRequest);
    }
}