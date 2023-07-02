import { validationResult } from "express-validator";
import { HTTP_STATUS_CODES } from "./constants/httpStatusCodes";
import { NextFunction, Request, Response } from "express";

/**
 * Validate query parameters
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    } else {
        next();
    }
};
