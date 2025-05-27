import { Router } from "express";
import { ProjectController } from "../controller/projectController";

export const projectRoute = Router();

projectRoute.get("/", ProjectController.getProjects);
projectRoute.post("/", ProjectController.createProjects);
