"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Code,
  Github,
  ExternalLink,
  Heart,
  MessageCircle,
  Eye,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Server,
  Globe,
  Smartphone,
  Database,
  Layers,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
// Mock data for web development projects
const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Platform with Next.js",
    description:
      "Plataforma completa de comercio electrónico con autenticación, pagos y panel de administración.",
    image: "/placeholder.svg?height=300&width=400",
    author: {
      name: "Carlos Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "carlos_dev",
    },
    category: "Full Stack",
    likes: 234,
    comments: 18,
    views: 1200,
    tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "MongoDB"],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Stripe API"],
    demoUrl: "https://example.com/demo",
    repoUrl: "https://github.com/example/ecommerce",
    featured: true,
  },
  {
    id: 2,
    title: "Dashboard Analytics con Vue.js",
    description:
      "Dashboard interactivo para visualización de datos con gráficos en tiempo real.",
    image: "/placeholder.svg?height=400&width=300",
    author: {
      name: "Laura Sánchez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "laura_code",
    },
    category: "Frontend",
    likes: 189,
    comments: 12,
    views: 890,
    tags: ["Vue.js", "D3.js", "Vuetify", "Firebase"],
    stack: ["Vue.js", "D3.js", "Firebase", "Vuetify"],
    demoUrl: "https://example.com/dashboard-demo",
    repoUrl: "https://github.com/example/dashboard",
    featured: true,
  },
  {
    id: 3,
    title: "API RESTful con Express y MongoDB",
    description:
      "API completa con autenticación JWT, validación y documentación Swagger.",
    image: "/placeholder.svg?height=250&width=400",
    author: {
      name: "Diego Martín",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "diego_backend",
    },
    category: "Backend",
    likes: 156,
    comments: 24,
    views: 670,
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
    demoUrl: "",
    repoUrl: "https://github.com/example/api",
    featured: false,
  },
  {
    id: 4,
    title: "App de Gestión de Tareas con React Native",
    description:
      "Aplicación móvil multiplataforma con sincronización offline y notificaciones push.",
    image: "/placeholder.svg?height=350&width=300",
    author: {
      name: "Ana López",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "ana_mobile",
    },
    category: "Mobile",
    likes: 298,
    comments: 31,
    views: 1450,
    tags: ["React Native", "Redux", "Firebase", "Expo"],
    stack: ["React Native", "Redux", "Firebase", "Expo"],
    demoUrl: "https://example.com/app-demo",
    repoUrl: "https://github.com/example/task-app",
    featured: true,
  },
  {
    id: 5,
    title: "Microservicios con Docker y Kubernetes",
    description:
      "Arquitectura de microservicios escalable con CI/CD y monitoreo.",
    image: "/placeholder.svg?height=280&width=400",
    author: {
      name: "Roberto Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "roberto_devops",
    },
    category: "DevOps",
    likes: 167,
    comments: 15,
    views: 920,
    tags: ["Docker", "Kubernetes", "CI/CD", "Prometheus", "Grafana"],
    stack: ["Docker", "Kubernetes", "Jenkins", "Prometheus", "Go"],
    demoUrl: "",
    repoUrl: "https://github.com/example/microservices",
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio Personal con Gatsby",
    description:
      "Sitio web personal con blog, proyectos y formulario de contacto.",
    image: "/placeholder.svg?height=400&width=300",
    author: {
      name: "Sofia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sofia_frontend",
    },
    category: "Frontend",
    likes: 445,
    comments: 52,
    views: 2100,
    tags: ["Gatsby", "React", "GraphQL", "Netlify"],
    stack: ["Gatsby", "React", "GraphQL", "Netlify CMS"],
    demoUrl: "https://example.com/portfolio",
    repoUrl: "https://github.com/example/portfolio",
    featured: true,
  },
];

const frameworks = [
  { name: "React", count: 1234, icon: Code },
  { name: "Vue.js", count: 987, icon: Code },
  { name: "Angular", count: 756, icon: Code },
  { name: "Next.js", count: 1432, icon: Code },
  { name: "Express", count: 890, icon: Server },
  { name: "Django", count: 543, icon: Server },
  { name: "Laravel", count: 432, icon: Server },
  { name: "React Native", count: 678, icon: Smartphone },
  { name: "Flutter", count: 567, icon: Smartphone },
];

const topDevelopers = [
  {
    name: "Carlos Rodríguez",
    username: "carlos_dev",
    avatar: "/placeholder.svg?height=60&width=60",
    specialty: "Full Stack Developer",
    rating: 4.9,
    projects: 67,
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Laura Sánchez",
    username: "laura_code",
    avatar: "/placeholder.svg?height=60&width=60",
    specialty: "Frontend Developer",
    rating: 4.8,
    projects: 54,
    skills: ["Vue.js", "CSS", "JavaScript"],
  },
  {
    name: "Diego Martín",
    username: "diego_backend",
    avatar: "/placeholder.svg?height=60&width=60",
    specialty: "Backend Developer",
    rating: 5.0,
    projects: 89,
    skills: ["Node.js", "Python", "AWS"],
  },
];

export default function WebDevelopmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = featuredProjects.filter(
    (project) =>
      (selectedCategory === "all" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        {/* Hero Section */}
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
                    <div className="text-sm text-muted-foreground">
                      Proyectos
                    </div>
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

        {/* Popular Frameworks */}
        <section className="py-12 bg-white">
          <div className="container px-4 m-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Frameworks y Tecnologías Populares
              </h2>
              <p className="text-muted-foreground">
                Explora proyectos por las tecnologías más utilizadas
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
              {frameworks.map((framework) => (
                <Card
                  key={framework.name}
                  className="text-center hover:shadow-md transition-shadow cursor-pointer hover:border-primary"
                >
                  <CardContent className="p-4">
                    <framework.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium text-sm mb-1">
                      {framework.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {framework.count} proyectos
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
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

        {/* Top Developers */}
        <section className="py-16 bg-white">
          <div className="container px-4 m-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Desarrolladores Destacados
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conecta con los mejores desarrolladores web de nuestra comunidad
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {topDevelopers.map((developer) => (
                <Card
                  key={developer.username}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage
                        src={developer.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>{developer.name[0]}</AvatarFallback>
                    </Avatar>

                    <h3 className="font-semibold text-lg mb-1">
                      {developer.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      ..{developer.username}
                    </p>
                    <p className="text-primary font-medium mb-4">
                      {developer.specialty}
                    </p>

                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {developer.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                      <div>
                        <div className="font-semibold">
                          {developer.projects}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Proyectos
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold flex items-center justify-center gap-1">
                          {developer.rating}
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/profile/${developer.username}`}>
                        Ver Perfil
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 m-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Especialidades de Desarrollo Web
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explora proyectos por área de especialización
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Interfaces de usuario, SPAs, y experiencias web interactivas
                  </p>
                  <Badge variant="secondary">4,500+ proyectos</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Server className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="font-semibold text-lg mb-2">Backend</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    APIs, servidores, y lógica de negocio
                  </p>
                  <Badge variant="secondary">3,200+ proyectos</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Layers className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-semibold text-lg mb-2">Full Stack</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Aplicaciones completas de principio a fin
                  </p>
                  <Badge variant="secondary">2,800+ proyectos</Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Database className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                  <h3 className="font-semibold text-lg mb-2">DevOps</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    CI/CD, contenedores, y infraestructura como código
                  </p>
                  <Badge variant="secondary">1,500+ proyectos</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container px-4 m-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Tienes un Proyecto de Desarrollo Web?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Comparte tu trabajo con miles de desarrolladores y recibe feedback
              valioso de la comunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Subir Proyecto
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link to="/categories">
                  Explorar Más Categorías
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
