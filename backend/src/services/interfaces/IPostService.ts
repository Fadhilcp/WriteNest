import { IPostDocument } from "../../types/post.type";

export interface IPostService {
    createPost(data: { title: string; content: string; authorId: string; }, fileBuffer?: Buffer): Promise<IPostDocument>;
    getAllPosts(): Promise<IPostDocument[]>;
    getPostById(id: string): Promise<IPostDocument | null>;
    updatePost(id: string, authorId: string, updates: Partial<IPostDocument>, fileBuffer?: Buffer): Promise<IPostDocument | null>;
    deletePost(id: string, authorId: string): Promise<boolean>;
}