import { catchAsync } from "@/middlewares/catchAsync";
import { Request, Response, NextFunction } from "express";
import {
  lookAllCommentsThatProject,
  createAComment,
  deleteAComment,
  updateAComment,
} from "../service/commentService";
import { validateComment } from "../schemas/schemaComents";

export class commentController {
  static getComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const result = await lookAllCommentsThatProject(req.project?.id!);
      if (!result) {
        res.status(404).json({ message: "no se encontro el proyecto" });
        return;
      }

      res.status(200).json(result);
    }
  );

  static createComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateComment(req.body);
      const result = await createAComment(vali);
      res.status(201).json({ message: "se creo el comentario", result });
    }
  );

  static deleteComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const comment = req.params.id;
      const user = req.user;
      const result = await deleteAComment(user?.user_id!, comment);
      if (!result.commet_id) {
        res.status(404).json({ message: "no se encontro el mensaje" });
        return;
      }

      res.status(201).json({ message: "se elimino el comentario con exito" });
    }
  );

  static updateComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateComment(req.body);
      const comment = req.params.id;
      const user = req.user;
      const result = await updateAComment(comment, vali, user?.user_id!);
      res.status(201).json(result);
    }
  );
}
