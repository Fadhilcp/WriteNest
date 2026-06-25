import { Types } from "mongoose";

export interface IPost {
    title: string;
    image?: string;
    content: string;
    author: Types.ObjectId;
    isPublished: boolean;
    isDeleted: boolean;
}

export interface IPostDocument extends Document, IPost {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}