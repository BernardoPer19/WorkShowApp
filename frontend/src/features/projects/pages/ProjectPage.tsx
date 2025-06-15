// src/pages/project/[projectId].tsx
import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Separator } from "../../../components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Bookmark,
  Share,
  ExternalLink,
  MoreHorizontal,
  Flag,
  Calendar,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import CommetsSection from "../components/CommetsSection";
import { useProjectById } from "../hooks/useProjectById";
import { useSave } from "../hooks/useSave";

export default function ProjectPage() {
  const { id: projectId } = useParams();
  const { data: project, error, isLoading } = useProjectById(projectId);
  const { saveProject } = useSave();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <div className="container px-4 py-8 max-w-6xl m-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">
                      {project?.title}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      {project?.descCorta}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project?.tecnologies?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="h-4 w-4 mr-2" />
                        Reportar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button
                    onClick={() => saveProject.mutate(project!.project_id!)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    Guardar
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={project?.images?.[0] || "/placeholder.svg"}
                  alt={project?.title}
                  className="w-full h-auto object-cover bg-gray-300"
                />
              </div>
              {(project?.images?.length ?? 0) > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {project?.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project?.title} - Imagen ${index + 2}`}
                        className="bg-gray-300 w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
              <CommetsSection />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {project?.users.avatar_url
                          ? project?.users.avatar_url
                          : project?.users.username.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {project?.users.name} {project?.users.lastname} |{" "}
                        {project?.users.profession}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        @{project?.users.username}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {project?.users.bio
                      ? project?.users.bio
                      : "No tiene bio el usuario"}
                  </p>
                  <div>
                    <h4 className="font-medium mb-2">
                      Tecnologías del Usuario
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project?.users?.userTecnologies?.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información del Proyecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {project?.createProject_at
                        ? new Date(
                            project.createProject_at
                          ).toLocaleDateString()
                        : "Fecha no disponible"}
                    </span>
                  </div>

                  {project?.demo_url && (
                    <Button className="w-full" asChild>
                      <Link to={project?.demo_url} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Demo
                      </Link>
                    </Button>
                  )}

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">
                      Herramientas Utilizadas
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project?.tecnologies?.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Duración</h4>
                    <p className="text-sm text-muted-foreground">
                      {project?.duration}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
