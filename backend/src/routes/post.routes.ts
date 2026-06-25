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

postRouter.get("/", postController.getAll.bind(postController));
postRouter.get("/me", authMiddleware,postController.getMyPosts.bind(postController));
postRouter.get("/:postId", postController.getById.bind(postController));

postRouter.post("/", authMiddleware,uploadImage.single("image"),postController.create.bind(postController));
postRouter.put("/:postId", authMiddleware,uploadImage.single("image"),postController.update.bind(postController));
postRouter.patch("/:postId/publish", authMiddleware,postController.publish.bind(postController));
postRouter.delete("/:postId", authMiddleware,postController.delete.bind(postController));

export default postRouter;