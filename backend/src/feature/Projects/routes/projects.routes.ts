import { Router } from "express";
import { ProjectController } from "../controller/projectController";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";

export const projectRoute = Router();

projectRoute.get("/project", verifyUser, ProjectController.getProjects);
projectRoute.post("/project", verifyUser, ProjectController.createProjects);
projectRoute.get("/project", verifyUser, ProjectController.getProjectsByUsers);
