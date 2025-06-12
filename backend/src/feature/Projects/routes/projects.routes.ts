import { Router } from "express";
import { ProjectController } from "../controller/projectController";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";

export const projectRoute = Router();

projectRoute.get("/project", verifyUser, ProjectController.getProjects);
projectRoute.get("/project/:id", verifyUser, ProjectController.getProjectsByUsers);

projectRoute.post("/project", verifyUser, ProjectController.createProjects);

projectRoute.delete("/project/:id", verifyUser, ProjectController.deleteProject);
projectRoute.put("/project/:id", verifyUser, ProjectController.updateProject);

