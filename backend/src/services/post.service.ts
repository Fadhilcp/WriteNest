import { IPostRepository } from "../repositories/interfaces/IPostRepository";
import { IPostDocument } from "../types/post.type";
import { uploadToCloudinary } from "../util/upload.utils";
import { IPostService } from "./interfaces/IPostService";

export class PostService implements IPostService{
    constructor(private _postRepository: IPostRepository) {}

    async createPost(data: { title: string; content: string; authorId: string }, fileBuffer?: Buffer): Promise<IPostDocument> {
        let imageUrl = "";
        
        if (fileBuffer) {
            imageUrl = await uploadToCloudinary(fileBuffer);
        }

        return await this._postRepository.create({
            title: data.title,
            content: data.content,
            author: data.authorId as any,
            image: imageUrl
        });
    }

    async getAllPosts(): Promise<IPostDocument[]> {
        return await this._postRepository.findAllWithAuthor();
    }

    async getPostById(id: string): Promise<IPostDocument | null> {
        const post = await this._postRepository.getPostWithAuthor(id);
        if (!post) throw new Error("Post not found");
        return post;
    }

    async updatePost(id: string, authorId: string, updates: Partial<IPostDocument>, fileBuffer?: Buffer): Promise<IPostDocument | null> {

        const post = await this._postRepository.findOne({ _id: id, isDeleted: false });
        if (!post) throw new Error("Post not found");

        if (post.author.toString() !== authorId) {
            throw new Error("Unauthorized to update this post");
        }

        if (fileBuffer) {
            updates.image = await uploadToCloudinary(fileBuffer);
        }

        return await this._postRepository.update(id, updates);
    }

    async deletePost(id: string, authorId: string): Promise<boolean> {
        
        const post = await this._postRepository.findById(id);
        if (!post) throw new Error("Post not found");

        if (post.author.toString() !== authorId) {
            throw new Error("Unauthorized to delete this post");
        }

        return await this._postRepository.delete(id);
    }
}