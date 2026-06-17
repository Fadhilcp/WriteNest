import { Request, Response, NextFunction } from "express";
import { IPostService } from "../services/interfaces/IPostService";
import { HttpStatus } from "../constants/statusCodes";
import { APP_MESSAGES } from "../constants/messages";

export class PostController {
    constructor(private _postService: IPostService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, content } = req.body;
            const authorId = req.user?.userId;

            if (!authorId) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: APP_MESSAGES.AUTH.UNAUTHORIZED });
                return;
            }

            const post = await this._postService.createPost(
                { title, content, authorId },
                req.file?.buffer
            );

            res.status(HttpStatus.CREATED).json({ message: APP_MESSAGES.POSTS.CREATE_SUCCESS, post });
        } catch (error) {
            next(error);
        }
    };

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await this._postService.getAllPosts();
            res.status(HttpStatus.OK).json(posts);
        } catch (error) {
            next(error);
        }
    };

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = req.params.postId as string || "";

            const post = await this._postService.getPostById(postId);
            res.status(HttpStatus.OK).json(post);
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
                res.status(HttpStatus.UNAUTHORIZED).json({ message: APP_MESSAGES.AUTH.UNAUTHORIZED });
                return;
            }

            const updatedPost = await this._postService.updatePost(
                postId,
                authorId,
                { title, content },
                req.file?.buffer
            );

            res.status(HttpStatus.OK).json({ message: APP_MESSAGES.POSTS.UPDATE_SUCCESS, post: updatedPost });
        } catch (error) {
            next(error);
        }
    };

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.user?.userId;
            const postId = req.params.postId as string || "";

            if (!authorId) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: APP_MESSAGES.AUTH.UNAUTHORIZED });
                return;
            }

            await this._postService.deletePost(postId, authorId);

            res.status(HttpStatus.OK).json({ message: APP_MESSAGES.POSTS.DELETE_SUCCESS });
        } catch (error) {
            next(error);
        }
    };
}