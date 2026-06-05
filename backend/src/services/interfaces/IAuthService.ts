import { IUserDocument } from "../../types/user.type";

export interface IAuthService {
    register(name: string, email: string, password: string, cofirmPassword: string)
    : Promise<{ user: Partial<IUserDocument>; refreshToken: string; accessToken: string; }>;

    login(email: string, password: string): Promise<{ user: Partial<IUserDocument>; refreshToken: string; accessToken: string; }>;
    refresh(incomingRefreshToken: string): Promise<{ user: Partial<IUserDocument>; accessToken: string; refreshToken: string; }>;
}