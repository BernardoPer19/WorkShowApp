import { LucideIcon } from "lucide-react"; // si usas iconos de Lucide


type Subcategory = {
  name: string;
  count: number;
  growth: string; // Ej: "+12%"
};

type FeaturedProject = {
  id: number;
  title: string;
  image: string;
  author: string;
  likes: number;
  views: number;
};



type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  projectCount: number;
  freelancerCount: number;
  trending: boolean;
  subcategories: Subcategory[];
  featuredProjects: FeaturedProject[];
};