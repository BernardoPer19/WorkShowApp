export type ProjectType = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  category_id: string;
  demo_url: string;
  createProject_at: Date;
};

export type CreateProjectType = Omit<ProjectType, "id" | "createProject_at">;