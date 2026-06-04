import { model, Schema } from "mongoose";
import { IPostDocument } from "../types/post.type";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: "",
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

export default model<IPostDocument>("Post", postSchema);