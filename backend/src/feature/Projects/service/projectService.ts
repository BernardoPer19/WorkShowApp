import { ProjectType, CreateProjectType } from "../types/projects";
import { prisma } from "@/config/prisma";

export const getAllProjectsThatUser = async () => {
  const project = await prisma.projects.findMany();

  if (!project) {
    throw new Error("Proyecto no encontrado");
  }

  return project;
};

export const getProjectThatUser = async (user: string) => {
  const project = await prisma.projects.findMany({
    where: { user_id: user },
  });
  return project;
};

export const createProject = async (
  input: CreateProjectType
): Promise<ProjectType> => {
  // Validar existencia de categoría
  const categoryExists = await prisma.categories.findUnique({
    where: { category_id: input.category_id },
  });

  if (!categoryExists) {
    throw new Error("La categoría no existe");
  }

  // Validar existencia del usuario
  const userExists = await prisma.users.findUnique({
    where: { user_id: input.user_id },
  });

  if (!userExists) {
    throw new Error("El usuario no existe");
  }

  const project = await prisma.projects.create({
    data: {
      title: input.title,
      description: input.description,
      user_id: input.user_id!,
      category_id: input.category_id!,
      demo_url: input.demo_url!,
    },
  });

  return {
    id: project.project_id,
    title: project.title!,
    description: project.description!,
    user_id: project.user_id!,
    category_id: project.category_id!,
    demo_url: project.demo_url!,
    createProject_at: project.createProject_at!,
  };
};

export class NewFeature {

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
}
