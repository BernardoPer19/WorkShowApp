import { catchAsync } from "@/middlewares/catchAsync";
import { NextFunction, Request, Response } from "express";
import SaveService from "../service/SaveService";



export class SaveController {

    static getSaved = catchAsync(
        async (req: Request, res: Response, _next: NextFunction) => {
            const user_id = req.user?.user_id;
            if (!user_id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const userProject = await SaveService.getSaved(user_id);
            res.status(200).json(userProject);
        }
    );

    static save = catchAsync(
        async (req: Request, res: Response, _next: NextFunction) => {
            if (!req.body || !req.body.projectId) {
                return res.status(400).json({ error: "Missing projectId in request body." });
            }

            const user_id = req.user?.user_id;
            const { projectId } = req.body;
            console.log(user_id, projectId);

            const addProject = await SaveService.save(user_id!, projectId);
            res.status(200).json(addProject);
        }
    );
    static delete = catchAsync(
        async (req: Request, res: Response, _next: NextFunction) => {
            const userId = req.user?.user_id;
            const { id: projectId } = req.params;
            const deleteProject = await SaveService.delete(userId!, projectId);
            res.status(200).json(deleteProject);
        }
    );


}