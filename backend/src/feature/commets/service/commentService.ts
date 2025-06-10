import { prisma } from "@/config/prisma";
import { ContainCommentTypes } from "../types/comment";
import { CommnetType } from "../schemas/schemaComents";

export class commetService {
  // public

  static lookAllCommentsThatProject = async (project: string) => {
    const comment = await prisma.commets.findMany({
      where: { project_id: project },
    });

    return comment;
  };

  static createAComment = async (
    input: CommnetType
  ): Promise<ContainCommentTypes> => {
    const project = await prisma.projects.findUnique({
      where: { project_id: input.project },
    });
    if (!project) {
      throw new Error("El proyecto no existe");
    }

    const comment = await prisma.commets.create({
      data: {
        content: input.content!,
        project_id: input.project!,
        user_id: input.user,
      },
    });

    return {
      commet_id: comment.commet_id,
      content: comment.content,
      project_id: comment.project_id,
      user_id: comment.user_id,
      create_at: comment.created_at!,
    };
  };

  static deleteAComment = async (userAutenticate: string, comment: string) => {
    const existing = await prisma.commets.findFirst({
      where: { commet_id: comment, user_id: userAutenticate },
    });

    if (!existing) {
      return null;
    }

    const coment = await prisma.commets.deleteMany({
      where: {
        commet_id: comment,
      },
    });

    return coment;
  };

  static updateAComment = async (
    comment_id: string,
    input: CommnetType,
    user: string
  ) => {
    const existeing = await prisma.commets.findFirst({
      where: { commet_id: comment_id, user_id: user },
    });

    if (!existeing) {
      return null;
    }

    const comment = await prisma.commets.update({
      where: {
        commet_id: comment_id,
      },
      data: { content: input.content! },
    });

    return comment;
  };
}
