import { ProjectType, CreateProjectType } from "../types/projects";
import { prisma } from "@/config/prisma";

export const getProjectThatUser = async () => {
  const project = await prisma.projects.findMany();

  if (!project) {
    throw new Error("Proyecto no encontrado");
  }

  return project;
};

export const createProject = async (
  input: CreateProjectType
): Promise<ProjectType> => {
  const project = await prisma.projects.create({
    data: {
      title: input.title,
      description: input.description,
      user_id: input.user_id!,
      category_id: input.category_id!,
      created_at: input.created_at,
      demo_url: input.demo_url!, // Add this line to provide demo_url
      // project_id is usually auto-generated, so it's not included here
    },
  });

  return {
    id: project.project_id,
    title: project.title!,
    description: project.description!,
    user_id: project.user_id!,
    category_id: project.category_id!,
    demo_url: project.demo_url!,
    created_at : project.created_at!
  };
};
