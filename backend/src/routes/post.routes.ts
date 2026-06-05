import { Router } from "express";
import { PostRepository } from "../repositories/post.repository";
import { PostService } from "../services/post.service";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadImage } from "../middleware/multer.middleware";

const postRouter = Router();

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

postRouter.get("/posts", postController.getAll.bind(postController));
postRouter.get("/posts/:postId", postController.getById.bind(postController));

postRouter.post("/posts", authMiddleware,uploadImage.single("image"),postController.create.bind(postController));
postRouter.put("/posts/:postId", authMiddleware,uploadImage.single("image"),postController.update.bind(postController));
postRouter.delete("/posts/:postId", authMiddleware,postController.delete.bind(postController));

export default postRouter;