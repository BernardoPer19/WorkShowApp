import { UserType } from "@/types/AuthTypes";


export interface CollectionType {
    collectionId: string;
    name: string;
    description: string;
    userId: string;
    createdAt: Date;
    collectionProjects?: CollectionProject[];
    user: UserType;
}









