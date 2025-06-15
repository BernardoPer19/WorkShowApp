export type ProjectType = {
    project_id: string;
    title: string;
    description?: string;
    user_id: string;
    category_id: string;
    demo_url: string;
    createProject_at: Date;
    tecnologies?: string[];
    duration: string;
    desCorta: string;
    images: string[];
};

export type CreateProjectType = Omit<ProjectType, "id" | "createProject_at">;