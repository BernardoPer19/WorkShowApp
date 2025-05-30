import { prisma } from "@/config/prisma";
import { ContainCommentTypes } from "../types/comment";
import { CommnetType } from "../schemas/schemaComents";

export const lookAllCommentsThatProject = async (project: string) => {
  const comment = await prisma.commets.findMany({
    where: { project_id: project },
  });

  if (!comment) {
    throw new Error("proyecto no encontrado");
  }

  return comment;
};

export const createAComment = async (
  input: CommnetType,
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

export const deleteAComment = async (
  userAutenticate: string,
  comment: string
) => {
  const coment = await prisma.commets.delete({
    where: {
      user_id: userAutenticate,
      commet_id: comment,
    },
  });

  return coment;
};

export const updateAComment = async (
  comment_id: string,
  input: CommnetType,
  user: string,
) => {
  const comment = await prisma.commets.update({
    where: { commet_id: comment_id, user_id: user , project_id : input.project },
    data: { content: input.content!},
  });

  return comment;
};
