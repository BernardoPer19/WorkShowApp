import { catchAsync } from "@/middlewares/catchAsync";
import { NextFunction, Request, Response } from "express";
import { CollectionService } from "../service/CollectionService";
import { validateCreateCollection } from "../schemas/Schema";

export class ConllectionController {
  static getCollectionTheUsers = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const userId = req.params.id;
      const getData = await CollectionService.getCollectionsByUser(userId);

      return res.status(200).json({
        success: true,
        message: "Colecciones obtenidas correctamente",
        data: getData,
      });
    }
  );

  static getCollectionById = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const collectionId = req.params.id;
      const getData = await CollectionService.CollectionById(collectionId);

      return res.status(200).json({
        success: true,
        message: "Colecciones obtenidas correctamente",
        data: getData,
      });
    }
  );

  static createCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const validateData = validateCreateCollection(req.body);
      if (!validateData.success) {
        res.json({ errors: validateData });
        return;
      }
      const userProject = await CollectionService.createCollection(
        validateData.data
      );
      res.status(200).json(userProject);
    }
  );
}
