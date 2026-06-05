import { Response } from "express";
import { env } from "../config/env.config";

export function setCookie(res: Response, refreshToken: string){
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.COOKIE_SAME_SITE as "strict" | "lax" | "none",
        maxAge: Number(env.COOKIE_MAX_AGE)
    });
}

export function clearCookie(res: Response){
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.COOKIE_SAME_SITE as "strict" | "lax" | "none",
    });
}