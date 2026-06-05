import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../util/verifyToken";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                message: "Authentication failed: Missing or malformed token" 
            });
        }

        const token = authHeader.split(" ")[1];

        const decodedPayload = verifyAccessToken(token);

        if (!decodedPayload) {
            return res.status(403).json({ 
                message: "Access denied: Token is invalid or expired" 
            });
        }

        req.user = {  userId: decodedPayload.userId, email: decodedPayload.email };

        next();
    } catch (error) {
        next(error);
    }
};