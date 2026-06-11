import { NextFunction, Request, Response } from "express"

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    const statusCode = error.statusCode || 500;

    const message = error.message || "Internal server error";

    return res.status(statusCode).json({ success: true, message });
}