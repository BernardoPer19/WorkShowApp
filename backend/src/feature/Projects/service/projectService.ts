import { bufferToUUID, uuidToBuffer } from "../utils/transformBuffer";
import { ProjectType, CreateProjectType } from "../types/projects";
import { prisma } from "@/config/prisma";

export const getProjectThatUser = async () => {
  const project = await prisma.projects.findMany();

  if (!project) {
    throw new Error("Proyecto no encontrado");
  }

  return project 
};

export const createProject = async (
  input: CreateProjectType
): Promise<ProjectType> => {
  const project = await prisma.projects.create({
    data: {
      title: input.title,
      description: input.description,
      user_id: uuidToBuffer(input.user_id!),
      category_id: uuidToBuffer(input.category_id!),
      created_at: input.created_at,
    },
  });
  return {
    id: bufferToUUID(Buffer.from(project.id)),
    title: project.title!,
    description: project.description!,
    user_id: bufferToUUID(Buffer.from(project.user_id!)),
    category_id: bufferToUUID(Buffer.from(project.category_id!)),
    demo_url: project.demo_url!,
    created_at: project.created_at!,
  };
};   
