import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@/middlewares/catchAsync";
import {
  getProjectThatUser,
  createProject,
  getAllProjectsThatUser,
} from "../service/projectService";
import { validateProject } from "../schemas/projectSchema";
import { CreateProjectType } from "../types/projects";

export class ProjectController {
  static getProjects = catchAsync(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const userProject = await getAllProjectsThatUser();
      res.status(200).json(userProject);
    }
  );

  static getProjectsByUsers = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      if (!req.user) {
        res.status(401).json({ message: "No autenticado" });
        return;
      }

      const result = await getProjectThatUser(req.user!.user_id);
      res.status(200).json(result);
    }
  );

  static createProjects = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateProject(req.body);

      const result = await createProject({
        title: vali.title,
        description: vali.description,
        user_id: req.user!.user_id,
        category_id: vali.category,
        demo_url: vali.demo_url,
      } as CreateProjectType);
      res.status(201).json({
        message: "se creo el proyecto con exito",
        data: result,
      });
    }
  );
}
