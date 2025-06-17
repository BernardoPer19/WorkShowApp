import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";

import {
  Code,
  Github,
  ExternalLink,
  Heart,
  MessageCircle,
  Eye,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Project, ViewMode } from "../../types/ProjectMockTyp";

interface ProjectGridProps {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  filteredProjects: Project[];
  viewMode: ViewMode;
}

function ProjectGrid({
  setSearchQuery,
  setSelectedCategory,
  filteredProjects,
  viewMode,
}: ProjectGridProps) {
  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="container px-4 m-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Proyectos Destacados</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta con otros términos de búsqueda o filtros
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`group cursor-pointer hover:shadow-xl transition-all duration-300 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "w-48 flex-shrink-0"
                        : "rounded-t-lg"
                    }`}
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <Badge className="absolute top-2 left-2 bg-blue-500">
                        Destacado
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {project.repoUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <Link to={project.repoUrl} target="_blank">
                            <Github className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <Link to={project.demoUrl} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardContent
                    className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{project.category}</Badge>
                    </div>

                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={project.author.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {project.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {project.author.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{project.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProjectGrid;
