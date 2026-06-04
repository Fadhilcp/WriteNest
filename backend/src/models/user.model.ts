import { model, Schema } from "mongoose";
import { IUserDocument } from "../types/user.type";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


export default model<IUserDocument>("User", userSchema);