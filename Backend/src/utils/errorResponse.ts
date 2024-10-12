import { Response } from "express";
import { ErrorType } from "./exceptions";

interface CustomError {
    statusCode: number;
    data?: any;
    error: ErrorType | null;
    message: string;
}

export default function errorResponse(
    res: Response,
    error: CustomError
): Response {
    return res.status(error.statusCode).json({
        success: false,
        error: error.error,
        message: error.message,
    });
}
