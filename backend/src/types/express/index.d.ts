import { ProjectType } from "@/feature/Projects/types/projects";
import { UserType } from "../AuthTypes";
export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
      project ?: ProjectType
    }
  }
}
