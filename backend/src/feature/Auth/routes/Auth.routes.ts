import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { verifyUser } from "../middlewares/VerifyUser";

export const AuthRouter = Router();

AuthRouter.post("/auth/register", AuthController.registerUser);
AuthRouter.post("/auth/login", AuthController.loginUser);
AuthRouter.post("/auth/logout", AuthController.logoutController);
AuthRouter.get("/auth/protected", verifyUser, AuthController.protectedRoute);
AuthRouter.get("/auth/currentUser", verifyUser, AuthController.getCurrentUser);
