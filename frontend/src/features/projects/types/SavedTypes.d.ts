export interface SavedProjects {
    id: string;
    userId: string;
    projectId: string;
    createdAt: Date;
    project: Project;
}

export interface Project {
    project_id: string;
    title: string;
    description: string;
    user_id: string;
    category_id: string;
    demo_url: string;
    createProject_at: Date;
    duration: string;
    descCorta: string;
    images: string[];
}
