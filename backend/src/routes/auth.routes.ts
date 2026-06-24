import { Router } from "express";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { EmailService } from "../services/email.service";

const authRouter = Router();

const userRepository = new UserRepository();
const emailService = new EmailService();

const authService = new AuthService(userRepository, emailService);
const authController = new AuthController(authService);

authRouter.post("/register",authController.register.bind(authController));
authRouter.post("/verify-register", authController.verifyRegister.bind(authController));
authRouter.post("/login",authController.login.bind(authController));
authRouter.post("/refresh",authController.refresh.bind(authController));
authRouter.post("/logout",authController.logout.bind(authController));

export default authRouter;