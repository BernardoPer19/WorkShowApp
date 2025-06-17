export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  category: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  stack: string[];
  demoUrl?: string;
  repoUrl: string;
  featured: boolean;
}


export type ViewMode = "grid" | "list";