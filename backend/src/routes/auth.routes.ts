import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/register",authController.register.bind(authController));
authRouter.post("/login",authController.login.bind(authController));
authRouter.post("/refresh",authController.refresh.bind(authController));

export default authRouter;