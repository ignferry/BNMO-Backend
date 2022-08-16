import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";


export default class AuthController {
    public authService = new AuthService();

    public signUp = async (req: Request, res: Response, next: NextFunction) => {

    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {

    };

    public logOut = async (req: Request, res: Response, next: NextFunction) => {

    };
}