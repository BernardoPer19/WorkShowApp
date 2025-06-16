import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import {
  Palette,
  Code,
  Camera,
  Pen,
  Shirt,
  PaintBucket,
  type LucideIcon,
} from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../../src/types/categoriesTypes";

type CategoryName =
  | "Diseño"
  | "Desarrollo"
  | "Multimedia"
  | "Escritura"
  | "Arte"
  | "Moda";

// Íconos para cada categoría
const iconMap: Record<CategoryName | string, LucideIcon> = {
  Diseño: Palette,
  Desarrollo: Code,
  Multimedia: Camera,
  Escritura: Pen,
  Arte: PaintBucket,
  Moda: Shirt,
};

// Mock de subcategorías por categoría
const mockSubcategories: Record<string, string[]> = {
  Diseño: ["UX/UI", "Diseño gráfico", "Figma", "Photoshop", "Branding"],
  Desarrollo: ["Frontend", "Backend", "Full Stack", "API", "React"],
  Multimedia: ["Edición de video", "Animación", "3D", "After Effects", "Cinemática"],
  Escritura: ["Copywriting", "Blog", "SEO", "Redacción técnica", "Narrativa"],
  Arte: ["Ilustración", "Acuarela", "Pintura digital", "Sketching", "Concept Art"],
  Moda: ["Diseño de ropa", "Modelaje", "Estilo urbano", "Tendencias", "Accesorios"],
};

const CategoriesNav = () => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return null;
  if (isError || !categories) return <p>Error al cargar categorías</p>;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 w-[600px] grid-cols-2">
          {(Array.isArray(categories) ? categories : []).map((category: Category) => {
            const Icon = iconMap[category.name];
            const subcategories = mockSubcategories[category.name] || [];

            return (
              <div key={category.category_id} className="space-y-3">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                  <h4 className="font-semibold">{category.name}</h4>
                </div>
                <div className="space-y-1">
                  {subcategories.slice(0, 5).map((sub) => (
                    <Link
                      key={sub}
                      to={`/category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                  <Link
                    to={`/categories/${category.name.toLowerCase()}`}
                    className="text-xs text-primary hover:underline"
                  >
                    Ver todas →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default CategoriesNav;
