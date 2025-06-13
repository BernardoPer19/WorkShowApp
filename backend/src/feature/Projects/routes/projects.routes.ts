import { Router } from "express";
import { ProjectController } from "../controller/projectController";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";

export const projectRoute = Router();

projectRoute.get("/project/categori", ProjectController.getAllCategories);

projectRoute.get("/project/category", verifyUser, ProjectController.getAlProjectsThatCategory);

projectRoute.get("/project", verifyUser, ProjectController.getProjects);

projectRoute.get("/project/:id", verifyUser, ProjectController.getProjectsByUsers);

projectRoute.get("/projects/project_user/:project_id", verifyUser, ProjectController.getProjectsByID);

projectRoute.post("/project", verifyUser, ProjectController.createProjects);


projectRoute.delete("/project/:id", verifyUser, ProjectController.deleteProject);
projectRoute.put("/project/:id", verifyUser, ProjectController.updateProject);




