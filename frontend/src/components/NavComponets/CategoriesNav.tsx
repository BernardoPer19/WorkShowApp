import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";

import { Palette, Code, Camera, Pen, Music, TrendingUp } from "lucide-react";

const categories = [
  {
    name: "Diseño",
    icon: Palette,
    subcategories: [
      { name: "UI/UX Design", count: 1234, trending: true },
      { name: "Graphic Design", count: 987 },
      { name: "Logo Design", count: 756 },
      { name: "Brand Identity", count: 543 },
      { name: "Print Design", count: 321 },
    ],
  },
  {
    name: "Desarrollo",
    icon: Code,
    subcategories: [
      { name: "Web Development", count: 2100, trending: true },
      { name: "Mobile Apps", count: 1456 },
      { name: "Backend", count: 890 },
      { name: "Frontend", count: 1200 },
      { name: "Full Stack", count: 678 },
    ],
  },
  {
    name: "Multimedia",
    icon: Camera,
    subcategories: [
      { name: "Photography", count: 1890 },
      { name: "Video Editing", count: 1234 },
      { name: "Animation", count: 567 },
      { name: "3D Modeling", count: 432 },
      { name: "Motion Graphics", count: 321 },
    ],
  },
  {
    name: "Escritura",
    icon: Pen,
    subcategories: [
      { name: "Copywriting", count: 890 },
      { name: "Content Writing", count: 756 },
      { name: "Technical Writing", count: 432 },
      { name: "Creative Writing", count: 321 },
      { name: "Translation", count: 234 },
    ],
  },
  {
    name: "Audio",
    icon: Music,
    subcategories: [
      { name: "Music Production", count: 567 },
      { name: "Sound Design", count: 432 },
      { name: "Podcast Editing", count: 321 },
      { name: "Voice Over", count: 234 },
      { name: "Audio Mixing", count: 189 },
    ],
  },
];

const CategoriesNav = () => {
  return (
    <div>
      {" "}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid gap-3 p-6 w-[600px] grid-cols-2">
            {categories.map((category) => (
              <div key={category.name} className="space-y-3">
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{category.name}</h4>
                </div>
                <div className="space-y-1">
                  {category.subcategories.slice(0, 4).map((sub) => (
                    <Link
                      key={sub.name}
                      to={`/category/${sub.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>{sub.name}</span>
                      <div className="flex items-center gap-1">
                        {sub.trending && (
                          <TrendingUp className="h-3 w-3 text-orange-500" />
                        )}
                        <span className="text-xs">{sub.count}</span>
                      </div>
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
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </div>
  );
};

export default CategoriesNav;
