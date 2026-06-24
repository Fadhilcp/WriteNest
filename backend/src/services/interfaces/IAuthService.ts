import { IUserDocument } from "../../types/user.type";

export interface IAuthService {
    register(name: string, email: string, password: string, cofirmPassword: string)
    : Promise<{ email: string; }>;

    verifyAndRegister(email: string, plainOTP: string)
    : Promise<{ user: Partial<IUserDocument>; refreshToken: string; accessToken: string; }>

    login(email: string, password: string): Promise<{ user: Partial<IUserDocument>; refreshToken: string; accessToken: string; }>;
    refresh(incomingRefreshToken: string): Promise<{ user: Partial<IUserDocument>; accessToken: string; refreshToken: string; }>;
}