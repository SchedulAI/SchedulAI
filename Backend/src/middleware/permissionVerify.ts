import { Request, Response, NextFunction } from "express";
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
            res.status(401).json({ message: "Unauthorized: No tokens provided" });
        }

        jwt.verify(sessionToken, config.SECRET_KEY, async (error: any, decoded: any) => {
            if (error) {
                return res.status(403).json({ message: "Invalid Token JWT" });
            } else {
                req.user = decoded as UserPayload;

                next();
            }
        });
    } catch (error: any) {
        res.status(403).json({ message: "Invalid Token JWT" });
    }
};
