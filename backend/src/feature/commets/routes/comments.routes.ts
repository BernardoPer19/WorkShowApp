import { Router } from "express";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";
import { commentController } from "../controller/commentsController";

export const commentRoute = Router();

commentRoute.get("/" , commentController.getComment);
commentRoute.post("/" , commentController.createComment);
commentRoute.delete("/:id" , verifyUser ,commentController.deleteComment);
commentRoute.put("/:id" , verifyUser, commentController.updateComment);
