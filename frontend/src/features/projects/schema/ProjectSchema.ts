import z from "zod";

export const projectSchema = z.object({
    title: z
        .string()
        .min(1, { message: "debes tener un titulo para el proyecto" }),
    description: z.string().optional(),
    category: z
        .string()
        .min(1, { message: "debes poner el nombre de la categoria" }),
    demo_url: z
        .string()
        .min(1, { message: "debes adjuntar una url al proyecto" }).optional(),
    tecnologies: z.array(z.string()).optional()

});

export type projectSchemaType = z.infer<typeof projectSchema>;
