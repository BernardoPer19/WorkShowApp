"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const catchAsync_1 = require("@/middlewares/catchAsync");
const projectService_1 = require("../service/projectService");
const projectSchema_1 = require("../schemas/projectSchema");
class ProjectController {
}
exports.ProjectController = ProjectController;
_a = ProjectController;
ProjectController.getProjects = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = req.params.id; // esto es para el usuario autenticado por ahora sacamos del params para que no lanze error
    const userProject = await (0, projectService_1.getProjectThatUser)(user);
    res.status(200).json(userProject);
});
ProjectController.createProjects = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const vali = (0, projectSchema_1.validateProject)(req.body);
    const result = await (0, projectService_1.createProject)({
        title: vali.title,
        description: vali.description,
        user_id: vali.user,
        category_id: vali.category,
    });
    res.status(201).json({
        message: "se creo el proyecto con exito",
        data: result,
    });
});
