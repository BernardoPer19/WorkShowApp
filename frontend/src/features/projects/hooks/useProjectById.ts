// hooks/useProjectById.ts
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/projectRequest";
import type { ProjectType } from "../types/ProjectsTypes";

export const useProjectById = (projectId?: string) => {
    return useQuery<ProjectType, Error>({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });
};

