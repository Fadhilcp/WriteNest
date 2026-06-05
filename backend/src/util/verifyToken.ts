import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { AccessTokenPayload, RefreshTokenPayload } from "../types/tokenPayload.type";

export function verifyRefreshToken(refreshToken: string): RefreshTokenPayload {

    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
    
    return decoded;
}

export function verifyAccessToken(accessToken: string): AccessTokenPayload {
    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET) as AccessTokenPayload;

    return decoded;
}