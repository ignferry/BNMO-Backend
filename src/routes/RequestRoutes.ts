import { Router } from "express";
import RequestController from "../controllers/RequestController";
import { Routes } from "../interfaces/RouteInterface";


export default class RequestRoutes implements Routes {
    public path = "/requests";
    public router = Router();
    public requestController = new RequestController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.requestController.getAllRequests);
        this.router.post(`${this.path}`, this.requestController.createRequest);
        this.router.delete(`${this.path}/:id(\\d+)`, this.requestController.deleteRequest);
        this.router.put(`${this.path}/verify/:id(\\d+)`, this.requestController.verifyRequest);
    }
}