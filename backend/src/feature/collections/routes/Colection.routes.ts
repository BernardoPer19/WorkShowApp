import { Router } from "express";
import { CollectionController } from "../controller/CollectionController";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";

export const CollectionRouter = Router();

// Obtener todas las colecciones de un usuario
CollectionRouter.get(
  "/users/:user_id/collections",
  verifyUser,
  CollectionController.getCollectionsByUser
);

// Obtener una colección específica por ID
CollectionRouter.get(
  "/collections/:collecition_id",
  verifyUser,
  CollectionController.getCollectionById
);

// Crear una nueva colección
CollectionRouter.post(
  "/collections",
  verifyUser,
  CollectionController.createNewCollection
);

// Agregar un proyecto a una colección
CollectionRouter.post(
  "/collections/:collection_id/projects",
  verifyUser,
  CollectionController.addProjectToCollection
);

// Eliminar un proyecto de una colección
CollectionRouter.delete(
  "/collections/:collection_id/projects/:project_id",
  verifyUser,
  CollectionController.removeProjectFromCollection
);
