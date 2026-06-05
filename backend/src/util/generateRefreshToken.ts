import jwt from "jsonwebtoken";
import { env } from "../config/env.config";


export default function generateRefreshToken(userId: string){
    return jwt.sign({
        userId
    }, env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
}
