import { Request, Response, NextFunction } from "express";
import { ForbiddenException, UnauthorizedException } from "../utils/exceptions";
import jwt from "jsonwebtoken";
import config from "../config";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const permissionVerify = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const sessionToken = req.cookies.session_id;

        if (!sessionToken) {
            throw new ForbiddenException("No Token Provided");
        }

        jwt.verify(
            sessionToken,
            config.SECRET_KEY,
            async (error: any, decoded: any) => {
                if (error) {
                    throw new UnauthorizedException("Invalid Token JWT");
                }
                req.user = decoded as UserPayload;

                next();
            }
        );
    } catch (error: any) {
        res.status(error.statusCode).json({
            success: false,
            error: error.error,
            message: error.message,
        });
    }
};
