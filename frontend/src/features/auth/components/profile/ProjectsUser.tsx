import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

import { TabsContent } from "../../../../components/ui/tabs";

import { Heart, MessageCircle, Eye, ExternalLink } from "lucide-react";

const userProjects = [
  {
    id: 1,
    title: "E-commerce Dashboard Redesign",
    description:
      "Complete redesign of an e-commerce admin dashboard with improved UX and modern design patterns.",
    image: "/placeholder.svg?height=300&width=400",
    category: "UI/UX Design",
    likes: 234,
    comments: 18,
    views: 1200,
    tags: ["Dashboard", "E-commerce", "Figma", "UI/UX"],
    createdAt: "2024-01-15",
    demoUrl: "https://example.com/demo",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description:
      "Secure and intuitive mobile banking application with biometric authentication.",
    image: "/placeholder.svg?height=400&width=300",
    category: "Mobile Development",
    likes: 189,
    comments: 12,
    views: 890,
    tags: ["React Native", "Banking", "Security", "Mobile"],
    createdAt: "2024-01-10",
    demoUrl: "https://example.com/banking-demo",
  },
  {
    id: 3,
    title: "Brand Identity Package",
    description:
      "Complete branding solution including logo, color palette, and brand guidelines.",
    image: "/placeholder.svg?height=250&width=400",
    category: "Branding",
    likes: 156,
    comments: 24,
    views: 670,
    tags: ["Logo", "Branding", "Identity", "Design"],
    createdAt: "2024-01-05",
    demoUrl: "",
  },
  {
    id: 4,
    title: "SaaS Dashboard Interface",
    description:
      "Modern dashboard design for a SaaS analytics platform with data visualization.",
    image: "/placeholder.svg?height=320&width=400",
    category: "UI/UX Design",
    likes: 312,
    comments: 28,
    views: 1580,
    tags: ["SaaS", "Analytics", "Dashboard", "Data Viz"],
    createdAt: "2023-12-20",
    demoUrl: "https://example.com/saas-demo",
  },
];



interface Props {
  viewMode: string;
}

function ProjectsUser({ viewMode }: Props) {
  return (
    <div>
      {" "}
      <TabsContent value="projects">
        <div
          className={
            viewMode === "grid"
              ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              : "space-y-4"
          }
        >
          {userProjects.map((project) => (
            <Card
              key={project.id}
              className={`break-inside-avoid group cursor-pointer hover:shadow-xl transition-all duration-300 ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-48 flex-shrink-0" : "rounded-t-lg"
                }`}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
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
                    {project.demoUrl && (
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
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
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
      </TabsContent>
    </div>
  );
}

export default ProjectsUser;
