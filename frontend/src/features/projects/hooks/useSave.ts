import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteSaved, getSaved, saveRequest } from "../api/SaveRequest"
import type { SavedProjects } from "../types/SavedTypes";


export const useSave = () => {
    const queryClient = useQueryClient();

    const invalidateProjectsQueries = () => {
        queryClient.invalidateQueries({ queryKey: ["savedPoject"] });
        queryClient.invalidateQueries({ queryKey: ["userProject"] });
    };

    const {
        data: savedProjects = [],
        isLoading,
        isError,
        error,
    } = useQuery<SavedProjects[]>({
        queryKey: ["savedProjects"],
        queryFn: getSaved,
    });




    const SaveProjects = useMutation({
        mutationFn: saveRequest,
        onSuccess: () => {
            invalidateProjectsQueries();
        },
        onError: (error: any) => {
            console.error("No se pudo guardar:", error?.response?.data?.error || error.message);
        }
    })

    const DeleteProject = useMutation({
        mutationFn: deleteSaved,
        onSuccess: () => {
            invalidateProjectsQueries();
        },
    })

    return {
        savedProjects,
        isLoading,
        isError,
        error,
        saveProject: SaveProjects,
        deletSaves: DeleteProject,
    }

}