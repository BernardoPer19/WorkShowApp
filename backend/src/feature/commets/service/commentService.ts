import { prisma } from "@/config/prisma";
import { ContainCommentTypes } from "../types/comment";
import { CommnetType } from "../schemas/schemaComents";

export class commetService {
  static lookAllCommentsThatProject = async (project: string) => {
    const comment = await prisma.commets.findMany({
      where: { project_id: project },
    });

    if (!comment) {
      throw new Error("proyecto no encontrado");
    }

    return comment;
  };

  static createAComment = async (
    input: CommnetType
  ): Promise<ContainCommentTypes> => {
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
    const user = await prisma.commets.findFirst({
      where: { commet_id: comment, user_id: userAutenticate },
    });

    if (!user) {
      return null;
    }

    const coment = await prisma.commets.delete({
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
    const comment = await prisma.commets.update({
      where: {
        commet_id: comment_id,
        user_id: user,
        project_id: input.project,
      },
      data: { content: input.content! },
    });

    return comment;
  };
}
