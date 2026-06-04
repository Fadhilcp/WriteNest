import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.config";

const app = express();
dotenv.config();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: process.env.CORS_METHODS?.split(","),
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
    credentials: process.env.CORS_CREDENTIALS === "true"
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running http://localhost:3000`);
});