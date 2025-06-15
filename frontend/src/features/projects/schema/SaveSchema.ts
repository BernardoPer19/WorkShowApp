import { z } from "zod";

export const saveProjectSchema = z.object({
  user_id: z.string().uuid(),     
  project_id: z.string().uuid(), 
});

export type SaveProjectInput = z.infer<typeof saveProjectSchema>;