import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createProject,
    deleteProject,
    getAllProject,
    getProjectByUser,
    updateProject,
} from "../api/projectRequest";
import { useAuthContext } from "../../auth/context/AuthContext";
import type { projectSchemaType } from "../schema/ProjectSchema";
import type { ProjectType } from "../types/ProjectsTypes";

export const useProject = () => {
    const queryClient = useQueryClient();
    const { currentUser } = useAuthContext();

    const {
        data: allProjects,
        error: allProjectsError,
        isLoading: isLoadingAllProjects,
    } = useQuery<ProjectType[], Error>({
        queryKey: ["projects"],
        queryFn: getAllProject,
    });

    // 🔎 Obtener proyectos del usuario actual (si corresponde)
    const {
        data: userProject,
        error: userProjectError,
        isLoading: isLoadingUserProject,
    } = useQuery<ProjectType[], Error>({
        queryKey: ["userProject", currentUser?.user_id],
        queryFn: () => getProjectByUser(currentUser!.user_id!),
        enabled: !!currentUser?.user_id, // Solo si hay user_id
    });

    // Función para invalidar ambas queries
    const invalidateProjectsQueries = () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        if (currentUser?.user_id) {
            queryClient.invalidateQueries({ queryKey: ["userProject", currentUser.user_id] });
        }
    };

    // ✅ Crear proyecto
    const createProjectMutation = useMutation<ProjectType, Error, projectSchemaType>({
        mutationFn: createProject,
        onSuccess: () => {
            invalidateProjectsQueries();
        },
    });

    // 🗑️ Eliminar proyecto
    const deleteProjectMutation = useMutation<void, Error, string>({
        mutationFn: deleteProject,
        onSuccess: () => {
            invalidateProjectsQueries();
        },
    });

    // 🔄 Actualizar proyecto
    const updateProjectMutation = useMutation<
        void,
        Error,
        { id: string; data: projectSchemaType }
    >({
        mutationFn: async ({ id, data }) => {
            await updateProject(id, data);
        },
        onSuccess: () => {
            invalidateProjectsQueries();
        },
    });

    return {
        allProjects: {
            data: allProjects,
            isLoading: isLoadingAllProjects,
            error: allProjectsError,
        },
        userProject: {
            data: userProject,
            isLoading: isLoadingUserProject,
            error: userProjectError,
        },
        createProject: createProjectMutation,
        deleteProject: deleteProjectMutation,
        updateProject: updateProjectMutation,
    };
};
