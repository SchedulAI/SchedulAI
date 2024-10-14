import { Response } from 'express';
import { ErrorType } from './exceptions';

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
  const statusCode = error.statusCode || 500;
  const err = error.error || 'INTERNAL_SERVER_ERROR';
  return res.status(statusCode).json({
    success: false,
    error: err,
    message: error.message,
  });
}
