import { prisma } from "@/config/prisma";
import { Collections, Projects } from "@prisma/client";
import { uuidType } from "../types/CollectionTypes";
import { CreateCollectionInput } from "../schemas/Schema";

export class CollectionService {
  // --- MÉTODOS PRIVADOS ---

  private static async findCollectionByIdOrFail(
    userId: string,
    collectionId: string
  ): Promise<Collections> {
    const collection = await prisma.collections.findUnique({
      where: { collection_id: collectionId },
    });

    if (!collection || collection.user_id !== userId) {
      throw new Error("Colección no encontrada o no pertenece al usuario");
    }

    return collection;
  }

  private static async findProjectByIdOrFail(
    userId: string,
    projectId: string
  ): Promise<Projects> {
    const project = await prisma.projects.findUnique({
      where: { project_id: projectId },
    });

    if (!project || project.user_id !== userId) {
      throw new Error("Proyecto no encontrado o no pertenece al usuario");
    }

    return project;
  }

  private static async assertNoExistingRelation(
    projectId: string,
    collectionId: string
  ): Promise<void> {
    const relation = await prisma.collection_projects.findFirst({
      where: { project_id: projectId, collection_id: collectionId },
    });

    if (relation) {
      throw new Error("El proyecto ya está en esta colección");
    }
  }

  // NUEVO: Validar múltiples proyectos de una vez (más eficiente)
  private static async validateMultipleProjects(
    userId: string,
    projectIds: string[]
  ): Promise<Projects[]> {
    const projects = await prisma.projects.findMany({
      where: {
        project_id: { in: projectIds },
        user_id: userId,
      },
    });

    if (projects.length !== projectIds.length) {
      const foundIds = projects.map((p) => p.project_id);
      const missingIds = projectIds.filter((id) => !foundIds.includes(id));
      throw new Error(`Proyectos no encontrados: ${missingIds.join(", ")}`);
    }

    return projects;
  }

  // --- MÉTODOS PÚBLICOS ---

  //! Crear colección
  static async createCollection(input: CreateCollectionInput) {
    try {
      // MEJORA: Validar que el nombre no esté duplicado para el usuario
      const existingCollection = await prisma.collections.findFirst({
        where: {
          name_collection: input.name,
          user_id: input.user_id,
        },
      });

      if (existingCollection) {
        throw new Error("Ya tienes una colección con este nombre");
      }

      return await prisma.collections.create({
        data: {
          name_collection: input.name,
          description: input.description ?? "",
          user_id: input.user_id,
        },
      });
    } catch (error) {
      console.error("Error al crear colección:", error);
      if (error instanceof Error) {
        throw error; // Re-lanzar errores conocidos
      }
      throw new Error("Error al crear una nueva colección");
    }
  }

  //! Obtener colecciones de un usuario con información adicional
  static async getCollectionsByUser(userId: uuidType) {
    try {
      return await prisma.collections.findMany({
        where: { user_id: userId },
        include: {
          _count: {
            select: { collection_projects: true }, // Contar proyectos en cada colección
          },
        },
        orderBy: { createCollection_at: "desc" }, // Más recientes primero
      });
    } catch (error) {
      console.error("Error al obtener colecciones:", error);
      throw new Error("Error al obtener las colecciones del usuario");
    }
  }

  //!  Obtener colección por id con proyectos
  static async getCollectionById(collectionId: uuidType) {
    try {
      const collection = await prisma.collections.findUnique({
        where: { collection_id: collectionId },
        include: {
          collection_projects: {
            include: {
              projects: {
                include: {
                  categories: true,
                  project_media: {
                    take: 1,
                    orderBy: { order: "asc" },
                  },
                  _count: {
                    select: { likes: true },
                  },
                },
              },
            },
            orderBy: {
              collection_projects_id: "desc",
            },
          },
        },
      });

      if (!collection) {
        throw new Error("Colección no encontrada");
      }

      return collection;
    } catch (error) {
      console.error("Error al obtener colección:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al obtener la colección");
    }
  }

  //! Agregar un proyecto a una colección usando IDs
  static async addProjectToCollection(
    userId: string,
    projectId: string,
    collectionId: string
  ) {
    try {
      // Usar transaction para asegurar consistencia
      const result = await prisma.$transaction(async (tx) => {
        // Validar existencia y pertenencia
        await this.findProjectByIdOrFail(userId, projectId);
        await this.findCollectionByIdOrFail(userId, collectionId);

        // Verificar relación existente
        await this.assertNoExistingRelation(projectId, collectionId);

        return await tx.collection_projects.create({
          data: { project_id: projectId, collection_id: collectionId },
          include: {
            projects: {
              select: {
                title: true,
                description: true,
              },
            },
            collections: {
              select: {
                name_collection: true,
              },
            },
          },
        });
      });

      return {
        success: true,
        message: "Proyecto agregado a la colección exitosamente",
        data: result,
      };
    } catch (error) {
      console.error("Error al agregar proyecto a colección:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error interno del servidor");
    }
  }

  //& Agregar múltiples proyectos a una colección usando IDs - MEJORADO
  static async addMultipleProjectsToCollection(
    userId: string,
    projectIds: string[],
    collectionId: string
  ) {
    try {
      if (!projectIds.length) {
        throw new Error("Debe proporcionar al menos un proyecto");
      }

      if (projectIds.length > 50) {
        throw new Error("No se pueden agregar más de 50 proyectos a la vez");
      }

      const result = await prisma.$transaction(async (tx) => {
        await this.findCollectionByIdOrFail(userId, collectionId);
        await this.validateMultipleProjects(userId, projectIds);

        const relations = projectIds.map((pid) => ({
          collection_id: collectionId,
          project_id: pid,
        }));

        return await tx.collection_projects.createMany({
          data: relations,
          skipDuplicates: true,
        });
      });

      return {
        success: true,
        message: `${result.count} proyectos agregados a la colección`,
        data: result,
      };
    } catch (error) {
      console.error("Error al agregar múltiples proyectos:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error interno del servidor");
    }
  }

  //! NUEVO: Remover proyecto de una colección
  static async removeProjectFromCollection(
    userId: string,
    projectId: string,
    collectionId: string
  ) {
    try {
      // Validar que tanto el proyecto como la colección pertenezcan al usuario
      await this.findProjectByIdOrFail(userId, projectId);
      await this.findCollectionByIdOrFail(userId, collectionId);

      const deletedRelation = await prisma.collection_projects.deleteMany({
        where: {
          project_id: projectId,
          collection_id: collectionId,
        },
      });

      if (deletedRelation.count === 0) {
        throw new Error("El proyecto no está en esta colección");
      }

      return {
        success: true,
        message: "Proyecto removido de la colección exitosamente",
        data: { count: deletedRelation.count },
      };
    } catch (error) {
      console.error("Error al remover proyecto de colección:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error interno del servidor");
    }
  }

  //! NUEVO: Obtener proyectos que NO están en ninguna colección
  static async getUnorganizedProjects(userId: string) {
    try {
      return await prisma.projects.findMany({
        where: {
          user_id: userId,
          collection_projects: {
            none: {},
          },
        },
        include: {
          categories: true,
          project_media: {
            take: 1,
            orderBy: { order: "asc" },
          },
        },
        orderBy: { createProject_at: "desc" },
      });
    } catch (error) {
      console.error("Error al obtener proyectos sin organizar:", error);
      throw new Error("Error al obtener proyectos sin organizar");
    }
  }

  //! NUEVO: Actualizar colección
  static async updateCollection(
    userId: string,
    collectionId: string,
    updateData: { name?: string; description?: string }
  ) {
    try {
      // Validar que la colección pertenezca al usuario
      await this.findCollectionByIdOrFail(userId, collectionId);

      // Si se actualiza el nombre, validar que no esté duplicado
      if (updateData.name) {
        const existingCollection = await prisma.collections.findFirst({
          where: {
            name_collection: updateData.name,
            user_id: userId,
            NOT: { collection_id: collectionId }, // Excluir la colección actual
          },
        });

        if (existingCollection) {
          throw new Error("Ya tienes una colección con este nombre");
        }
      }

      const updatedCollection = await prisma.collections.update({
        where: { collection_id: collectionId },
        data: {
          ...(updateData.name && { name_collection: updateData.name }),
          ...(updateData.description !== undefined && {
            description: updateData.description,
          }),
        },
      });

      return {
        success: true,
        message: "Colección actualizada exitosamente",
        data: updatedCollection,
      };
    } catch (error) {
      console.error("Error al actualizar colección:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al actualizar la colección");
    }
  }

  //! NUEVO: Eliminar colección */
  static async deleteCollection(userId: string, collectionId: string) {
    try {
      const collection = await this.findCollectionByIdOrFail(
        userId,
        collectionId
      );

      // Usar transacción para eliminar primero las relaciones y luego la colección
      await prisma.$transaction(async (tx) => {
        // Eliminar todas las relaciones
        await tx.collection_projects.deleteMany({
          where: { collection_id: collectionId },
        });

        // Eliminar la colección
        await tx.collections.delete({
          where: { collection_id: collectionId },
        });
      });

      return {
        success: true,
        message: "Colección eliminada exitosamente",
        data: { deletedCollection: collection.name_collection },
      };
    } catch (error) {
      console.error("Error al eliminar colección:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al eliminar la colección");
    }
  }
}
