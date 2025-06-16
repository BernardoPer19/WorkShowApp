// AuthRequest.ts
import { apiRequest } from "../../../utils/api";
import type { SavedProjects } from "../types/SavedTypes";


export const saveRequest = async (projectId: string): Promise<void> => {
    return apiRequest({
        method: "post",
        url: "/save",
        data: { projectId },
    });
};

export const getSaved = async (): Promise<SavedProjects[]> => {
    return apiRequest({
        method: "get",
        url: "/saved",
    });
};

export const deleteSaved = async (projectId: string): Promise<void> => {
    return apiRequest({
        method: "delete",
        url: `/save/${projectId}`,
        successMessage: "Proyecto eliminado correctamente",
    });
};

