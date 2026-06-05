import jwt from "jsonwebtoken";
import { env } from "../config/env.config";


export default function generateAccessToken(userId: string, email: string){
    return jwt.sign({
        userId, email
    }, env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
