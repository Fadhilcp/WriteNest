import { Request, Response, NextFunction } from "express";
import { clearCookie, setCookie } from "../util/cookie";
import { IAuthService } from "../services/interfaces/IAuthService";
import { APP_MESSAGES } from "../constants/messages";
import { HttpStatus } from "../constants/statusCodes";

export class AuthController {

    constructor(private _authService: IAuthService) {}

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            const result = await this._authService.register(name, email, password, confirmPassword);

            setCookie(res, result.refreshToken);

            res.status(HttpStatus.CREATED).json({
                message: APP_MESSAGES.AUTH.REGISTER_SUCCESS,
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

            res.status(HttpStatus.OK).json({
                message: APP_MESSAGES.AUTH.LOGIN_SUCCESS,
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
                res.status(HttpStatus.UNAUTHORIZED).json({ message: APP_MESSAGES.AUTH.TOKEN_MISSING });
                return;
            }

            const result = await this._authService.refresh(incomingRefreshToken);

            setCookie(res, result.refreshToken)

            res.status(HttpStatus.OK).json({
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

            res.status(HttpStatus.OK).json({
                message: APP_MESSAGES.AUTH.LOGOUT_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}