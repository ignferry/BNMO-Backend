import { Request } from "express";
import { User } from "../db/models/User";

export interface RequestWithUser extends Request {
    user: User;
}