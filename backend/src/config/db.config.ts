import mongoose from "mongoose";

export default async function connectDB(){
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(MONGODB_URI)
        
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(`MongoDB connection error:${error}`);
        process.exit(1);
    }
};