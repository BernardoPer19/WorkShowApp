import { Router } from "express";
import { CollectionController } from "../controller/CollectionController";

export const CollectionRouter = Router();

// Obtener todas las colecciones de un usuario
CollectionRouter.get(
  "/users/:user_id/collections",
  CollectionController.getCollectionsByUser
);

// Obtener una colección específica por ID
CollectionRouter.get(
  "/collections/:collecition_id",
  CollectionController.getCollectionById
);

// Crear una nueva colección
CollectionRouter.post(
  "/collections",
   CollectionController.createNewCollection
);

// Agregar un proyecto a una colección
CollectionRouter.post(
  "/collections/:collection_id/projects",
  CollectionController.addProjectToCollection
);

// Eliminar un proyecto de una colección
CollectionRouter.delete(
  "/collections/:collection_id/projects/:project_id",
  CollectionController.removeProjectFromCollection
);
