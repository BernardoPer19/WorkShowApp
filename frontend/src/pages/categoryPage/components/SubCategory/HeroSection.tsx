import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import { Search, Grid3X3, List } from "lucide-react";

import { useState } from "react";
import type { ViewMode } from "../../types/ProjectMockTyp";

type Category = string; // Puedes ajustar según el tipo real de categoría

interface HeroSectionProps {
  selectedCategory: Category;
  sortBy: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (option: string) => void;
  setSelectedCategory: (category: Category) => void;
}

function HeroSection({
  selectedCategory,
  sortBy,
  setViewMode,
  setSortBy,
  viewMode,
  setSelectedCategory,
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10 py-16">
        <div className="container px-4 m-auto">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Categoría
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Desarrollo Web</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explora proyectos innovadores de desarrollo web, desde
              aplicaciones frontend hasta arquitecturas backend complejas y
              soluciones full-stack.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar proyectos, tecnologías, frameworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Más Popular</SelectItem>
                  <SelectItem value="recent">Más Reciente</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none h-12"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none h-12"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12K+</div>
                  <div className="text-sm text-muted-foreground">Proyectos</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-muted-foreground">
                    Desarrolladores
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Frameworks
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">120+</div>
                  <div className="text-sm text-muted-foreground">Países</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
