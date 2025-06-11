import { z } from "zod";

export const saveProjectSchema = z.object({
  userId: z.string().uuid(),     // debe ser UUID válido
  projectId: z.string().uuid(),  // debe ser UUID válido
});

export type SaveProjectInput = z.infer<typeof saveProjectSchema>;