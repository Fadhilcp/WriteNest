import { APP_MESSAGES } from "../constants/messages";
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

    async getMyPosts(userId: string, isPublished: boolean): Promise<IPostDocument[]> {
        return await this._postRepository.findMyPosts(userId, isPublished);
    }

    async getPostById(postId: string): Promise<IPostDocument | null> {
        const post = await this._postRepository.getPostWithAuthor(postId);

        if (!post || post.isDeleted || !post.isPublished) {
            throw new Error(APP_MESSAGES.POSTS.NOT_FOUND);
        }
        return post;
    }

    async updatePost(id: string, authorId: string, updates: Partial<IPostDocument>, fileBuffer?: Buffer): Promise<IPostDocument | null> {

        const post = await this._postRepository.findOne({ _id: id, isDeleted: false });
        if (!post) throw new Error(APP_MESSAGES.POSTS.NOT_FOUND);

        if (post.author.toString() !== authorId) {
            throw new Error(APP_MESSAGES.POSTS.UNAUTHORIZED_UPDATE);
        }

        if (post.isPublished) {
            throw new Error("Cannot edit a post after it has been published.");
        }

        if (fileBuffer) {
            updates.image = await uploadToCloudinary(fileBuffer);
        }

        return await this._postRepository.update(id, updates);
    }

    async publishPost(postId: string, authorId: string): Promise<IPostDocument | null> {
        const post = await this._postRepository.findOne({ _id: postId, isDeleted: false });
        if (!post) throw new Error(APP_MESSAGES.POSTS.NOT_FOUND);

        if (post.author.toString() !== authorId) {
            throw new Error(APP_MESSAGES.POSTS.UNAUTHORIZED_UPDATE);
        }

        if (post.isPublished) {
            throw new Error("Post is already published.");
        }

        return await this._postRepository.update(postId, { isPublished: true } as Partial<IPostDocument>);
    }

    async deletePost(id: string, authorId: string): Promise<boolean> {
        
        const post = await this._postRepository.findById(id);
        if (!post) throw new Error(APP_MESSAGES.POSTS.NOT_FOUND);

        if (post.author.toString() !== authorId) {
            throw new Error(APP_MESSAGES.POSTS.UNAUTHORIZED_DELETE);
        }

        return await this._postRepository.delete(id);
    }
}