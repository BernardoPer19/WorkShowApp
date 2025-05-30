import { UserType } from "@/types/AuthTypes";


export interface CollectionType {
  collectionId: uuidType;
  name: string;
  description: string;
  user_id: uuidType;
  createdAt: Date;
  collectionProjects?: CollectionProject[];
  user: UserType;
}

export type newCollection = Pick<CollectionType, "collectionId" | "userId">;
