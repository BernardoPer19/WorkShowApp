import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

import { TabsContent } from "../../../../components/ui/tabs";

import { Eye, ExternalLink } from "lucide-react";
import { useProject } from "../../../../../src/features/projects/hooks/useProjectsApi";
import { Link } from "react-router-dom";

interface Props {
  viewMode: string;
}

function ProjectsUser({ viewMode }: Props) {
  const { userProject, deleteProject } = useProject();

  return (
    <div>
      <TabsContent value="projects">
        <div
          className={
            viewMode === "grid"
              ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              : "space-y-3 xl:columns-2"
          }
        >
          {!userProject.data || userProject.data.length === 0 ? (
            <div className="p-6 text-center w-full text-gray-500 ">
              <p className="text-lg text-center">
                ¡Aún no tienes proyectos para mostrar!
              </p>
            </div>
          ) : (
            userProject.data.map((project) => (
              <Card
                className={`break-inside-avoid group min-w-96 cursor-pointer hover:shadow-xl transition-all duration-300 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-48 flex-shrink-0" : "rounded-t-lg"
                  }`}
                >
                  <img
                    src={project?.images[0] || "/placeholder.svg"}
                    alt={project?.title}
                    width={400}
                    height={300}
                    key={project?.project_id}
                    className={
                      viewMode === "grid"
                        ? "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        : "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    }
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {project?.demo_url && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent
                  className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                >
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {project?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {project?.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project?.tecnologies?.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project!.tecnologies!.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project!.tecnologies!.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <div className="flex justify-center items-center gap-5">
                  <Link to={`/project/${project.project_id}`}>
                    <button className="bg-blue-500 px-3.5 py-1 rounded text-white hover:bg-blue-600 transition">
                      Ver Proyecto
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProject.mutate(project!.project_id)}
                    className="bg-red-500 px-3.5 py-1 rounded text-white"
                  >
                    Eliminar
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>
      </TabsContent>
    </div>
  );
}

export default ProjectsUser;
