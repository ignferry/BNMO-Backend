import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../db/models/User";
import { HttpException } from "../exceptions/HttpException";
import { RequestWithUser } from "../interfaces/AuthInterface";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = req.header("Authorization") ? req.header("Authorization")?.split("Bearer ")[1] : null;
        req.file?.filename;

        if (access_token) {
            const secretKey: string = process.env.SECRET_KEY as string;
            const payload: {username: string} = verify(access_token, secretKey) as {username: string};
            const username = payload.username;

            console.log(payload);

            const currentUser = await User.findOne({
                where: {
                    username: username
                }
            });

            if (currentUser) {
                res.locals.user = currentUser;
                next();
            }
            else {
                throw 0;
            }
        }
        else {
            throw 0;
        }
    }
    catch (err) {
        next(new HttpException(401, "Unauthorized"));
    }
};