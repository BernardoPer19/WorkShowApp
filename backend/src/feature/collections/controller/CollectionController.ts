import { catchAsync } from "@/middlewares/catchAsync";
import { NextFunction, Request, Response } from "express";
import { CollectionService } from "../service/CollectionService";
import { validateCreateCollection } from "../schemas/Schema";

export class CollectionController {
  // 🔍 Obtener todas las colecciones de un usuario
  static getCollectionsByUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const userId = req.params.id;

      const collections = await CollectionService.getCollectionsByUser(userId);

      return res.status(200).json({
        success: true,
        message: "Colecciones del usuario obtenidas correctamente",
        data: collections,
      });
    }
  );

  // 🔍 Obtener una colección por ID (con proyectos incluidos)
  static getCollectionById = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const collectionId = req.params.collection_id;

      const collection = await CollectionService.CollectionById(collectionId);

      return res.status(200).json({
        success: true,
        message: "Colección obtenida correctamente",
        data: collection,
      });
    }
  );

  // 🆕 Crear una nueva colección
  static createNewCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const validateData = validateCreateCollection(req.body);
      const userId = req.user?.user_id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "No autorizado. Usuario no autenticado",
        });
      }

      if (!validateData.success) {
        return res.status(400).json({
          success: false,
          message: "Datos inválidos para crear la colección",
          errors: validateData.error.flatten(),
        });
      }

      const newCollection = await CollectionService.createCollection({
        ...validateData.data,
        user_id: userId,
      });

      return res.status(201).json({
        success: true,
        message: "Colección creada correctamente",
        data: newCollection,
      });
    }
  );

  // ➕ Agregar proyecto a una colección
  static addProjectToCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user_id = req.user?.user_id;
      const { product_id, collection_id } = req.body;

      if (!user_id || !product_id || !collection_id) {
        return res.status(400).json({
          success: false,
          message: "Faltan datos requeridos para añadir el proyecto",
          missing: {
            user_id: !user_id,
            product_id: !product_id,
            collection_id: !collection_id,
          },
        });
      }

      const result = await CollectionService.addProjectToCollection(
        user_id,
        product_id,
        collection_id
      );

      return res.status(200).json({
        success: true,
        message: "Proyecto añadido a la colección correctamente",
        data: result.data,
      });
    }
  );

  // ❌ Eliminar proyecto de una colección
  static removeProjectFromCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user_id = req.user?.user_id;
      const { product_id, collection_id } = req.body;

      if (!user_id || !product_id || !collection_id) {
        return res.status(400).json({
          success: false,
          message: "Faltan datos requeridos para eliminar el proyecto",
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

  static updateCollection = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user_id = req.user?.user_id; // ← Solo el usuario autenticado
      const { collection_id, name, description } = req.body;

      if (!user_id || !collection_id) {
        return res.status(400).json({
          success: false,
          message:
            "Faltan campos requeridos: collection_id o no estás autenticado",
        });
      }

      if (name === undefined && description === undefined) {
        return res.status(400).json({
          success: false,
          message:
            "Debes proporcionar al menos un campo (name o description) para actualizar",
        });
      }

      try {
        const result = await CollectionService.updateCollection(
          user_id,
          collection_id,
          {
            name,
            description,
          }
        );

        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Error al actualizar la colección",
        });
      }
    }
  );
}
