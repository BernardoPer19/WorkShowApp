export type ProjectType = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  category_id: string;
  demo_url: string;
  created_at: Date;
};

export type CreateProjectType = Omit<ProjectType, "id">;