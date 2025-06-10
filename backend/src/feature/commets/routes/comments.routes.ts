import { Router } from "express";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";
import { commentController } from "../controller/commentsController";

export const commentRoute = Router();

commentRoute.get("/comment/:id" , commentController.getComment);
commentRoute.post("/comment" , commentController.createComment);
commentRoute.delete("/comment/:id" , verifyUser ,commentController.deleteComment);
commentRoute.put("/comment/:id" , verifyUser, commentController.updateComment);
