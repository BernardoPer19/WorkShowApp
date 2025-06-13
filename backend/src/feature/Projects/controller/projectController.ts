import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@/middlewares/catchAsync";
import { projectService } from "../service/projectService";
import { validateProject } from "../schemas/projectSchema";
import { CreateProjectType, ProjectType } from "../types/projects";

export class ProjectController {
  static getProjects = catchAsync(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const userProject = await projectService.getAllProjectsThatUser();
      res.status(200).json(userProject);
    }
  );

  static getProjectsByUsers = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const result = await projectService.getProjectThatUser(req.params.id);
      res.status(200).json(result);
    }
  );

  static createProjects = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateProject(req.body);

      const result = await projectService.createProject({
        title: vali.title,
        description: vali.description,
        user_id: req.user!.user_id,
        category_id: vali.category,
        demo_url: vali.demo_url,
        tecnologies: vali.tecnologies,
        duration: vali.duration,
        desCorta: vali.desCorta,
        images: vali.images,
      } as CreateProjectType);
      res.status(201).json({
        message: "se creo el proyecto con exito",
        data: result,
      });
    }
  );

  static deleteProject = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user;
      const project = req.params.id;
      const result = await projectService.deleteProjects(
        project,
        user?.user_id!
      );
      res    
        .status(201)
        .json({ message: "se elimino el proyecto con exito", result });
    }
  );

  static updateProject = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateProject(req.body);
      const user = req.user?.user_id!;
      const project = req.params.id;

      const result = await projectService.updateProjects(project, user, {
        title: vali.title!,
        description: vali.description!,
        demo_url: vali.demo_url!,
      } as ProjectType);
      res.status(201).json({ message: "se actualizo con exito", result });
    }
  );
}
