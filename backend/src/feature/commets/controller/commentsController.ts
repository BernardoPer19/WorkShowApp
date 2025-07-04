import { catchAsync } from "@/middlewares/catchAsync";
import { Request, Response, NextFunction } from "express";
import { commetService } from "../service/commentService";
import { validateComment } from "../schemas/schemaComents";

export class commentController {
  static getComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const result = await commetService.lookAllCommentsThatProject(
        req.params.id
      );
      res.status(200).json(result);
    }
  );

  static createComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateComment(req.body);
      const result = await commetService.createAComment(vali);
      res.status(201).json({ message: "se creo el comentario", result });
    }
  );

  static deleteComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const comment = req.params.id;
      const user = req.user;

      const result = await commetService.deleteAComment(
        user!.user_id!,
        comment
      );

      if (!result) {
        res
          .status(404)
          .json({ message: "El comentario no existe o no te pertenece" });
        return;
      }
      res
        .status(201)
        .json({ message: "se elimino el comentario con exito", result });
    }
  );

  static updateComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateComment(req.body);
      const comment = req.params.id;
      const user = req.user;

      const result = await commetService.updateAComment(
        comment,
        vali,
        user!.user_id
      );
      if (!result) {
        res
          .status(404)
          .json({ message: "Comentario no encontrado o no autorizado." });
        return;
      }
      res
        .status(201)
        .json({ message: "Comentario actualizado.", data: result });
    }
  );
}
