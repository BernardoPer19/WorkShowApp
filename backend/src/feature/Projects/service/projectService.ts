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

  static searchProject  = async (project : string):Promise<boolean> =>{
    const projectRes = await prisma.projects.findFirst({where : {project_id : project}})
    if(!projectRes){
      throw new Error("projecto no encontrado");
    }
    return !!projectRes;
  }

  // publicos
  static getAllProjectsThatUser = async () => {
    const project = await prisma.projects.findMany();
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
    await this.verifyOnlyProject(input.title);
    await this.categoriExists(input.category_id);
    await this.userExist(input.user_id);

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
    await this.userExist(user);
    await  this.searchProject(project);
    const projects = await prisma.projects.delete({
      where: {
        user_id: user,
        project_id: project,
      },
    });
   
    return projects;
  };

  static updateProjects = async (
    project: string,
    user: string,
    input: ProjectType
  ) => {

   await  this.searchProject(project);
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
