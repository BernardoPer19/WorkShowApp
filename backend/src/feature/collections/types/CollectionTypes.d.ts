import { UserType } from "@/types/AuthTypes";

export interface CollectionType {
  collectionId: string;
  name: string;
  description: string;
  user_id: string;
  createdAt: Date;
  collectionProjects?: CollectionProject[];
  user: UserType;
}

export type newCollection = Pick<CollectionType, "collectionId" | "userId">;
