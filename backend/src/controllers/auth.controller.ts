import { Request, Response, NextFunction } from "express";
import { clearCookie, setCookie } from "../util/cookie";
import { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController {

    constructor(private _authService: IAuthService) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            const result = await this._authService.register(name, email, password, confirmPassword);

            setCookie(res, result.refreshToken);

            res.status(201).json({
                message: "Registration successful",
                user: result.user,
                accessToken: result.accessToken,
            });
        } catch (error) {
            next(error); 
        }
    };

    async login (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const result = await this._authService.login(email, password);

            setCookie(res, result.refreshToken)

            res.status(200).json({
                message: "Login successful",
                user: result.user,
                accessToken: result.accessToken,
            });
        } catch (error) {
            next(error);
        }
    };

    async refresh (req: Request, res: Response, next: NextFunction){
        try {
            const incomingRefreshToken = req.cookies.refreshToken;

            if (!incomingRefreshToken) {
                res.status(401).json({ message: "Refresh token is missing" });
                return;
            }

            const result = await this._authService.refresh(incomingRefreshToken);

            setCookie(res, result.refreshToken)

            res.status(200).json({
                user: result.user,
                accessToken: result.accessToken,
            });
        } catch (error) {
            clearCookie(res);
            next(error);
        }
    };

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            
            clearCookie(res);

            res.status(200).json({
                message: "Logged out successfully. Session destroyed."
            });
        } catch (error) {
            next(error);
        }
    }
}