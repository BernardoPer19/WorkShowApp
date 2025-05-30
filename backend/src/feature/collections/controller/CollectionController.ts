import { catchAsync } from "@/middlewares/catchAsync";
import { NextFunction, Request, Response } from "express";
import { CollectionService } from "../service/CollectionService";
import { validateCreateCollection } from "../schemas/Schema";

export class CollectionController {
  static getCollectionsByUser = catchAsync(
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
      const collectionId = req.params.collecition_id;
      const getData = await CollectionService.CollectionById(collectionId);

      return res.status(200).json({
        success: true,
        message: "Colecciones obtenidas correctamente",
        data: getData,
      });
    }
  );

  static createNewCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const validateData = validateCreateCollection(req.body);
      if (!validateData.success) {
        res.json({ errors: validateData });
        return;
      }
      const userProject = await CollectionService.createCollection(
        validateData.data
      );
      return res.status(200).json({
        success: true,
        message: "Se creo la colleccion correctamente",
        data: userProject,
      });
    }
  );

  static addProjectToCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { user_id, product_id, collection_id } = req.body;

      if (!user_id || !product_id || !collection_id) {
        return res.status(400).json({
          success: false,
          message:
            "Faltan datos requeridos para añadir el proyecto a la colección",
          missing: {
            user_id: !user_id,
            product_id: !product_id,
            collection_id: !collection_id,
          },
        });
      }

      const addProject = await CollectionService.addProjectToCollection(
        user_id,
        product_id,
        collection_id
      );

      return res.status(200).json({
        success: true,
        message: "Proyecto añadido a la colección correctamente",
        data: addProject.data,
      });
    }
  );

  static removeProjectFromCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { user_id, product_id, collection_id } = req.body;

      if (!user_id || !product_id || !collection_id) {
        return res.status(400).json({
          success: false,
          message:
            "Faltan datos requeridos para eliminar el proyecto de la colección",
          missing: {
            user_id: !user_id,
            product_id: !product_id,
            collection_id: !collection_id,
          },
        });
      }

      const deleted = await CollectionService.deleteProjectFromCollection(
        user_id,
        product_id,
        collection_id
      );

      return res.status(200).json({
        success: true,
        message: "Proyecto eliminado de la colección correctamente",
        data: deleted,
      });
    }
  );
}
