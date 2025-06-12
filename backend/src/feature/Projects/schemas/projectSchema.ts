import z from "zod";

const projectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "debes tener un titulo para el proyecto" }),
  description: z.string().optional(),
  category: z
    .string()
    .min(1, { message: "debes poner el nombre de la categoria" }),
  demo_url: z
    .string()
    .min(1, { message: "debes adjuntar una url al proyecto" }),
  tecnologies: z.array(z.string()).optional(),
  duration: z
    .string()
    .min(1, { message: "proporciona el tiempo de duracion del proyecto" }),
  desCorta: z
    .string()
    .min(1, { message: "esribe una breve descripcio nde tu proyecto " }),
  images: z.array(z.string()).min(1, { message: "proporciona al menos una imagen del proyecto" }),
});

export type projectSchemaType = z.infer<typeof projectSchema>;

export const validateProject = (input: unknown): projectSchemaType => {
  const result = projectSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};
