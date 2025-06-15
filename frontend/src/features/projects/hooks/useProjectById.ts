// hooks/useProjectById.ts
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../api/projectRequest";
import type { ProjectTypes } from "../types/ProjectType";

export const useProjectById = (projectId?: string) => {
    return useQuery<ProjectTypes, Error>({
        queryKey: ["project", projectId],
        queryFn: () => getProjectById(projectId!),
        enabled: !!projectId,
    });
};

