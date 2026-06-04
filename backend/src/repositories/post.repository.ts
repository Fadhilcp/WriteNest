import postModel from "../models/post.model";
import { IPostDocument } from "../types/post.type";
import { BaseRepository } from "./base.repository";

export class PostRepository extends BaseRepository<IPostDocument> {
    constructor() {
        super(postModel);
    }

    async getPostsByAuthor(authorId: string): Promise<IPostDocument[]> {
        return this.model.find({ author: authorId });
    }

    async getPostWithAuthor(postId: string): Promise<IPostDocument | null> {
        return this.model
        .findById(postId)
        .populate("author");
    }
}