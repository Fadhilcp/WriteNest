import { Request, Response, NextFunction } from "express";
import { IPostService } from "../services/interfaces/IPostService";

export class PostController {
    constructor(private _postService: IPostService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content } = req.body;
            const authorId = req.user?.userId;

            if (!authorId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const post = await this._postService.createPost(
                { title, content, authorId },
                req.file?.buffer
            );

            res.status(201).json({ message: "Post created successfully", post });
        } catch (error) {
            next(error);
        }
    };

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await this._postService.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    };

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId as string || "";

            const post = await this._postService.getPostById(postId);
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    };

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content } = req.body;
            const authorId = req.user?.userId;
            const postId = req.params.postId as string || "";

            if (!authorId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const updatedPost = await this._postService.updatePost(
                postId,
                authorId,
                { title, content },
                req.file?.buffer
            );

            res.status(200).json({ message: "Post updated successfully", post: updatedPost });
        } catch (error) {
            next(error);
        }
    };

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.user?.userId;
            const postId = req.params.postId as string || "";

            if (!authorId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            await this._postService.deletePost(postId, authorId);

            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
}