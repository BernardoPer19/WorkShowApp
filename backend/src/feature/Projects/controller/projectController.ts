import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@/middlewares/catchAsync";
import { getProjectThatUser, createProject } from "../service/projectService";
import { validateProject } from "../schemas/projectSchema";
import { CreateProjectType } from "../types/projects";

export class ProjectController {
  static getProjects = catchAsync(
    async (_req: Request, res: Response, _next: NextFunction) => {
      //const user = req.params.id; // esto es para el usuario autenticado por ahora sacamos del params para que no lanze error
      const userProject = await getProjectThatUser();
      res.status(200).json(userProject);
    }
  );

  static createProjects = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateProject(req.body);

      const result = await createProject({
        title: vali.title,
        description: vali.description,
        user_id: vali.user,
        category_id: vali.category,
      } as CreateProjectType);
      res.status(201).json({
        message: "se creo el proyecto con exito",
        data: result,
      });
    }
  );
}
