import postModel from "../models/post.model";
import { IPostDocument } from "../types/post.type";
import { BaseRepository } from "./base.repository";
import { IPostRepository } from "./interfaces/IPostRepository";

export class PostRepository extends BaseRepository<IPostDocument> implements IPostRepository {
    constructor() {
        super(postModel);
    }

    async findAllWithAuthor(): Promise<IPostDocument[]> {
        return await this.model
            .find({ isDeleted: false })
            .populate("author", "name email")
            .sort({ createdAt: -1 });
    }

    async getPostsByAuthor(authorId: string): Promise<IPostDocument[]> {
        return await this.model
            .find({ author: authorId, isDeleted: false })
            .populate("author", "name email")
            .sort({ createdAt: -1 });
    }

    async getPostWithAuthor(postId: string): Promise<IPostDocument | null> {
        return this.model
        .findOne({ _id: postId, isDeleted: false })
        .populate("author");
    }
}