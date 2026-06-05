import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.config";
import { env } from "./config/env.config";
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";

const app = express();

connectDB();

app.use(cors({
    origin: env.CLIENT_URL,
    methods: env.CORS_METHODS?.split(","),
    allowedHeaders: env.CORS_ALLOWED_HEADERS,
    credentials: env.CORS_CREDENTIALS
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(env.PORT, () => {
    console.log(`server is running http://localhost:3000`);
});