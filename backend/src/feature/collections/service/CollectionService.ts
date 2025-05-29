import { prisma } from "@/config/prisma";
import { CollectionType, uuidType } from "../types/CollectionTypes";
import { CreateCollectionInput } from "../schemas/Schema";

export class CollectionService {
  static async getCollection(user_id: uuidType) {
    const allCollections = await prisma.collections.findMany({
      where: {
        user_id,
      },
    });
    return allCollections;
  }

  static async getCollectionById(collection_id: uuidType) {
    const allCollections = await prisma.collections.findUnique({
      where: { collection_id },
      include: {
        collection_projects: {
          include: {
            projects: true,
          },
        },
      },
    });
    return allCollections;
  }
  static async createCollection(input: CreateCollectionInput) {
    try {
      const newCollection = await prisma.collections.create({
        data: {
          name_collection: input.name,
          description: input.description ?? "",
          user_id: input.user_id,
        },
      });

      return newCollection;
    } catch (error) {
      throw new Error("Error al crear una nueva colección");
    }
  }
  static async addProjectToCollection(
    user_id: string,
    projectTitle: string, // O projectId si ya lo tienes
    collectionName: string // O collectionId si ya lo tienes
  ) {
    try {
      //find project and chack if it belong to user
      const project = await prisma.projects.findFirst({
        where: {
          title: projectTitle,
          user_id: user_id,
        },
      });

      if (!project) {
        throw new Error("Proyecto no encontrado o no pertenece al usuario");
      }
      //find collection and check if it there's the user

      const collection = await prisma.collections.findFirst({
        where: {
          name_collection: collectionName,
          user_id: user_id,
        },
      });

      if (!collection) {
        throw new Error("Colección no encontrada o no pertenece al usuario");
      }

      //check if the relationship alredy exists to avoid dupicate

    } catch (error) {}
  }
  static async updateDataCollection() {}
}
