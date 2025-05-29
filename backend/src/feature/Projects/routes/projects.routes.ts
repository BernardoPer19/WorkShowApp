import { Router } from "express";
import { ProjectController } from "../controller/projectController";
import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";

export const projectRoute = Router();

projectRoute.get("/", ProjectController.getProjects);
projectRoute.post("/",verifyUser ,ProjectController.createProjects);
projectRoute.get("/my-proyects",verifyUser, ProjectController.getProjectsThatUsers);

    