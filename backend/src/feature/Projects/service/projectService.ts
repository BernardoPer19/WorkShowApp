import { ProjectType, CreateProjectType } from "../types/projects";
import { prisma } from "@/config/prisma";

export class projectService {
  // control de proyectos privados
  static verifyOnlyProject = async (projectTitle: string): Promise<boolean> => {
    const verificacion = await prisma.projects.findFirst({
      where: { title: projectTitle },
    });

    if (verificacion) {
      throw new Error("Proyecto repetido");
    }

    return !!verificacion;
  };

  // Validar existencia de categoría
  static categoriExists = async (
    categorieProject: string
  ): Promise<boolean> => {
    const categoryExist = await prisma.categories.findUnique({
      where: { category_id: categorieProject },
    });

    if (!categoryExist) {
      throw new Error("La categoría no existe");
    }
    return !!categoryExist;
  };

  // Validar existencia del usuario
  static userExist = async (user: string): Promise<boolean> => {
    const userExists = await prisma.users.findUnique({
      where: { user_id: user },
    });

    if (!userExists) {
      throw new Error("El usuario no existe");
    }
    return !!userExists;
  };

  static searchProject = async (project: string): Promise<boolean> => {
    const projectRes = await prisma.projects.findFirst({
      where: { project_id: project },
    });
    if (!projectRes) {
      throw new Error("projecto no encontrado");
    }
    return !!projectRes;
  };

  // publicos
  static getAllProjectsThatUser = async () => {
    const projects = await prisma.projects.findMany({
      include: {
        tecnologies: {
          select: {
            tecnology: true,
          },
        },
      },
    });

    return projects.map((p) => ({
      ...p,
      tecnologies: p.tecnologies.map((t) => t.tecnology.name),
    }));
  };

  static getProjectThatUser = async (id: string) => {
    const projects = await prisma.projects.findMany({
      where: { user_id: id },
      include: {
        tecnologies: {
          select: {
            tecnology: true,
          },
        },
      },
    });

    return projects.map((p) => ({
      ...p,
      tecnologies: p.tecnologies.map((t) => t.tecnology.name),
    }));
  };

  static createProject = async (
    input: CreateProjectType
  ): Promise<ProjectType> => {
    await this.verifyOnlyProject(input.title);
    await this.categoriExists(input.category_id);
    await this.userExist(input.user_id);

    const tecnologiId: string[] = [];

    for (const name of input.tecnologies) {
      let tecnologi = await prisma.tecnologies.findUnique({ where: { name } });
      if (!tecnologi) {
        tecnologi = await prisma.tecnologies.create({ data: { name } });
      }
      tecnologiId.push(tecnologi.tecnology_id);
    }

    const project = await prisma.projects.create({
      data: {
        title: input.title,
        description: input.description,
        user_id: input.user_id,
        category_id: input.category_id,
        demo_url: input.demo_url,
        duration: input.duration,
        descCorta: input.desCorta,
        images: input.images!,
        tecnologies: {
          create: tecnologiId.map((id) => ({
            tecnology: {
              connect: { tecnology_id: id },
            },
          })),
        },
      },
      include: {
        tecnologies: {
          include: {
            tecnology: true,
          },
        },
      },
    });

    return {
      project_id: project.project_id,
      title: project.title,
      description: project.description,
      user_id: project.user_id,
      category_id: project.category_id,
      demo_url: project.demo_url,
      createProject_at: project.createProject_at,
      tecnologies: project.tecnologies.map((t) => t.tecnology.name),
      duration: project.duration,
      desCorta: project.descCorta,
      images: project.images,
    };
  };

  static deleteProjects = async (project: string, user: string) => {
    await this.userExist(user);
    await this.searchProject(project);

    const result = await prisma.$transaction([
      prisma.projectTecnology.deleteMany({
        where: { project_id: project },
      }),

      prisma.projects.delete({
        where: { project_id: project },
      }),
    ]);

    return result[1];
  };

  static updateProjects = async (
    project: string,
    user: string,
    input: ProjectType
  ) => {
    await this.searchProject(project);
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

  static getByCategories = async () => {
    try {
      const categorie = await prisma.categories.findMany();
      return categorie;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  };

  static async getCategoriesToFilter(categoria: string) {
    const result = await prisma.$queryRaw`
      SELECT 
        p.title, 
        p.description, 
        p.duration,
        p."descCorta",
        u.name AS user_name,
        s.name AS subcategoria_del_proyecto,
        p.images
      FROM "Projects" p
      INNER JOIN "Users" u ON p.user_id = u.user_id
      INNER JOIN "Categories" c ON p.category_id = c.category_id
      INNER JOIN "Subcategory" s ON c.category_id = s.category_id
      WHERE c.name = ${categoria};
    `;
    return result;
  }
}
