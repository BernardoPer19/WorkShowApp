import { verifyUser } from "@/feature/Auth/middlewares/VerifyUser";
import { Router } from "express";
import { SaveController } from "../controller/SaveController";

export const SaveRoutes = Router();

SaveRoutes.get("/saved", verifyUser, SaveController.getSaved);
SaveRoutes.post("/save", verifyUser, SaveController.saved);
SaveRoutes.delete("/save/:id", verifyUser, SaveController.delete);
