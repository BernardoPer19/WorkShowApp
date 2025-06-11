import { catchAsync } from "@/middlewares/catchAsync";
import { NextFunction, Request, Response } from "express";
import SaveService from "../service/SaveService";



export class SaveController {

    static getSaved = catchAsync(
        async (req: Request, res: Response, _next: NextFunction) => {
            const { userId } = req.body
            const userProject = await SaveService.getSaved(userId)
            res.status(200).json(userProject);
        }
    );
    static saved = catchAsync(
        async (req: Request, res: Response, _next: NextFunction) => {
            const addProject = await SaveService.save(req.body)
            res.status(200).json(addProject);
        }
    )
    static delete = catchAsync(
        async (req: Request, res: Response, _next: NextFunction) => {
            const { userId, projectId } = req.body
            const deleteProject = await SaveService.delete(userId, projectId)
            res.status(200).json(deleteProject);
        }
    )

}