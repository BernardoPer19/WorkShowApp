import z from "zod";

const commentSchema = z.object({
  content: z.string().min(1, { message: "debes poner un poco de contenido" }),
  project: z.string().min(1, { message: "debes poner el 'url' del proyecto" }),
  user: z
    .string()
    .min(1, {
      message: "debes proporcionar el nombre de quien hace el comentario",
    }),
});

export type CommnetType = z.infer<typeof commentSchema>;

export const validateComment = (input: unknown): CommnetType => {
  const result = commentSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
