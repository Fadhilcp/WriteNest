import { IPostDocument } from "../../types/post.type";
import { IBaseRepository } from "./IBaseRepository";

export interface IPostRepository extends IBaseRepository<IPostDocument> {
    getPostsByAuthor(authorId: string): Promise<IPostDocument[]>;
    getPostWithAuthor(postId: string): Promise<IPostDocument | null>;
}