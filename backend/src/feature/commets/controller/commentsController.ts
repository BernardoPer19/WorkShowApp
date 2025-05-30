import { catchAsync } from "@/middlewares/catchAsync";
import { Request, Response, NextFunction } from "express";
import { commetService } from "../service/commentService";
import { validateComment } from "../schemas/schemaComents";

export class commentController {
  static getComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const result = await commetService.lookAllCommentsThatProject(req.params.id);
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
      const result = await commetService.createAComment(vali);
      res.status(201).json({ message: "se creo el comentario", result });
    }
  );

  static deleteComment = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const comment = req.params.id;
      const user = req.user;
      console.log("user", user);

      const result = await commetService.deleteAComment(user?.user_id!, comment);

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
      const result = await commetService.updateAComment(comment, vali, user?.user_id!);
      res.status(201).json(result);
    }
  );
}

// 19a48055-9ecd-436f-9e6c-84f19bbe5c75
// 9460f390-9520-4bd4-b6c9-ee9ffdb02f8a
// d18acd3c-f50a-4f65-a011-b455b8530e77
