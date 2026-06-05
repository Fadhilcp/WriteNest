import mongoose from "mongoose";
import { env } from "./env.config";

export default async function connectDB(){
    try {
        const MONGODB_URI = env.MONGODB_URI;

        await mongoose.connect(MONGODB_URI)
        
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`MongoDB connection error:${error}`);
        process.exit(1);
    }
};