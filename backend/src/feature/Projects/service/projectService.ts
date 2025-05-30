import { ProjectType, CreateProjectType } from "../types/projects";
import { prisma } from "@/config/prisma";

export class projectService {
  // control de proyectos privados
  static verificarSoloUnProyecto = async (
  projectTitle: string
): Promise<boolean> => {
  const verificacion = await prisma.projects.findFirst({
    where: { title: projectTitle },
  });

 
  if (verificacion) {
    throw new Error("Proyecto repetido");
  }

  return !!verificacion;
};

  // publicos
  static getAllProjectsThatUser = async () => {
    const project = await prisma.projects.findMany();

    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    return project;
  };

  static getProjectThatUser = async (user: string) => {
    const project = await prisma.projects.findMany({
      where: { user_id: user },
    });
    return project;
  };

  static createProject = async (
    input: CreateProjectType
  ): Promise<ProjectType> => {


    await this.verificarSoloUnProyecto(input.title);
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

  static deleteProjects = async (project: string, user: string) => {
    const userExists = await prisma.users.findUnique({
      where: { user_id: user },
    });

    if (!userExists) {
      throw new Error("El usuario no existe");
    }
    const projects = await prisma.projects.delete({
      where: {
        user_id: user,
        project_id: project,
      },
    });
    if (!projects.project_id) {
      throw new Error("no se encontro el projecto");
    }
    return projects;
  };

  static updateProjects = async (
    project: string,
    user: string,
    input: ProjectType
  ) => {
    const projects = await prisma.projects.update({
      where: { project_id: project, user_id: user },
      data: {
        description: input.description,
        demo_url: input.demo_url,
        title: input.title,
      },
    });
    return projects;
  };
}
