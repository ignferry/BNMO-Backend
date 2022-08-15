import { NextFunction, Request, Response } from "express";

import { ValidationError, ValidationErrorItem } from "sequelize/types";

function makeValidationErrorItems(errors: ValidationErrorItem[]): object {
    let res = {};

    for (const error of errors) {
        console.log(error);
        let key: string = error.path!;
        res = { ...res, [key]: error.message}
    }

    return res;
}


export const validationErrorMiddleware = (error: ValidationError, req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(400).json({
            message: "Validation Error",
            errors: makeValidationErrorItems(error.errors)
        });
    }
    catch {
        next(error);
    }
}