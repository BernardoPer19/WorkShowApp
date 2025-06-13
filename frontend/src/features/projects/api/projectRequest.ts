// ProjectRequest.ts

import { apiRequest } from "../../../../src/utils/api";
import type { projectSchemaType } from "../schema/ProjectSchema";
import type { ProjectType } from "../types/ProjectsTypes";

// Obtener todos los proyectos
export const getAllProject = async (): Promise<ProjectType[]> => {
    return apiRequest({
        method: "get",
        url: "/project",
    });
};


// Obtener proyecto por ID
export const getProjectByUser = async (userID: string): Promise<ProjectType[]> => {
    return apiRequest({
        method: "get",
        url: `/project/${userID}`,
    });
};

// Obtener proyecto por ID
export const getProjectById = async (id: string): Promise<ProjectType[]> => {
    return apiRequest({
        method: "get",
        url: `/project/${id}`,
    });
};

// Obtener proyectos por categoría (pendiente)
export const getProjectByCategory = async () => {
    return apiRequest({
        method: "get",
        url: `/project/byCategory`, // poné la ruta correcta según tu backend
    });
};

// Crear proyecto
export const createProject = async (data: projectSchemaType): Promise<ProjectType> => {
    return apiRequest({
        method: "post",
        url: `/project`,
        data,
        successMessage: "Proyecto creado correctamente",
    });
};

// Eliminar proyecto
export const deleteProject = async (id: string): Promise<void> => {
    return apiRequest({
        method: "delete",
        url: `/project/${id}`,
        successMessage: "Proyecto eliminado correctamente",
    });
};

// Actualizar proyecto
export const updateProject = async (id: string, data: projectSchemaType): Promise<ProjectType> => {
    return apiRequest({
        method: "put",
        url: `/project/${id}`,
        data,
        successMessage: "Proyecto actualizado correctamente",
    });
};
