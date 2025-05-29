import { UserSchema } from "@/feature/Auth/schemas/AuthSchea";
import { z } from "zod";

const CollectionProjectSchema = z.object({
  projectId: z.string(),
});

export const PublicUserSchema = UserSchema.omit({ password: true });

export const CollectionSchema = z.object({
  collectionId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  user_id: z.string().uuid(),
  createdAt: z.coerce.date(),
  collectionProjects: z.array(CollectionProjectSchema).optional(),
  user: PublicUserSchema,
});

export const CreateCollectionSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  user_id: z.string().uuid(),
});

export type UserType = z.infer<typeof UserSchema>;

export type CollectionProject = z.infer<typeof CollectionProjectSchema>;

export type CollectionType = z.infer<typeof CollectionSchema>;

export type CreateCollectionInput = z.infer<typeof CreateCollectionSchema>;

export function validateCollection(data: unknown) {
  return CollectionSchema.safeParse(data);
}

export function validateCreateCollection(data: unknown) {
  return CreateCollectionSchema.safeParse(data);
}
