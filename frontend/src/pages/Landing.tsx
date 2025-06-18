import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Code,
  Palette,
  Camera,
  Music,
  Pen,
  ArrowRight,
  Heart,
  MessageCircle,
  // Bookmark,
  Eye,
  ExternalLink,
  Play,
} from "lucide-react";
// import AddToCollectionDialog from "@/components/add-to-collection-dialog";
import { Link } from "react-router-dom";

// Mock data
const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "Modern dashboard design for online store management",
    image:
      "https://images.ctfassets.net/dfcvkz6j859j/2r8wSI1BTI0LE4SeHLvGIw/63777a67fadcdaa6581f3c47434c2ad2/Ecommerce-Dashboard-Template-Example.png",
    author: {
      name: "María García",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "maria_design",
    },
    category: "UI/UX Design",
    likes: 234,
    comments: 18,
    views: 1200,
    tags: ["Dashboard", "E-commerce", "Figma"],
  },
  
  {
    id: 3,
    title: "Brand Identity Design",
    description: "Complete branding package for tech startup",
    image:
      "https://media.coschedule.com/uploads/2023/03/Visual-Identity-design-logos-layout-color-font.png",
    author: {
      name: "Ana López",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "ana_brand",
    },
    category: "Branding",
    likes: 156,
    comments: 24,
    views: 670,
    tags: ["Logo", "Branding", "Startup"],
  },
  {
    id: 4,
    title: "3D Product Visualization",
    description: "Interactive 3D models for product showcase",
    image:
      "https://cdn.prod.website-files.com/619626b75c00e7698d8d88ca/63d7859cc043ed9d6d8b295d_3D-Product-Rendering-3DSoftware-View.jpg",
    author: {
      name: "Diego Martín",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "diego_3d",
    },
    category: "3D Design",
    likes: 298,
    comments: 31,
    views: 1450,
    tags: ["3D", "Blender", "Product"],
  },
  {
    id: 5,
    title: "Web Development Portfolio",
    description: "Personal portfolio website with animations",
    image:
      "https://img.freepik.com/premium-psd/stationery-branding-identity-mockup_406637-338.jpg",
    author: {
      name: "Laura Sánchez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "laura_code",
    },
    category: "Web Development",
    likes: 167,
    comments: 15,
    views: 920,
    tags: ["React", "Portfolio", "Animation"],
  },

];

const categories = [
  { name: "UI/UX Design", icon: Palette, count: 1234 },
  { name: "Web Development", icon: Code, count: 987 },
  { name: "Photography", icon: Camera, count: 756 },
  { name: "Illustration", icon: Pen, count: 543 },
  { name: "Music", icon: Music, count: 321 },
];

export default function HomePage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full h-full bg-gray-400">
        <main className="w-full">
          {/* Hero Section */}
          <section className="relative flex justify-center items-center overflow-hidden h-[100vh] bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
            <div className=" px-4">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  Descubre el Talento
                  <span className="block text-primary">Creativo</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                  La plataforma donde freelancers de todo el mundo comparten sus
                  mejores trabajos. Encuentra inspiración, conecta con talento y
                  haz crecer tu red profesional.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-12 px-8" asChild>
                    <Link to="/categories">
                      Explorar Proyectos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8"
                    // onClick={() => setIsLoggedIn(true)}
                  >
                    <Link to={"/auth/register"}>Únete como Freelancer</Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">
                      Proyectos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">12K+</div>
                    <div className="text-sm text-muted-foreground">
                      Freelancers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">500K+</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">25K+</div>
                    <div className="text-sm text-muted-foreground">
                      Comentarios
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-16 bg-white w-full">
            <div className="container m-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Explora por Categorías
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Descubre proyectos increíbles organizados por especialidad
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category) => (
                  <Card
                    key={category.name}
                    className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link to="/categories">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <category.icon className="h-6 w-6" />
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count.toLocaleString()} proyectos
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="py-16 bg-gray-50 w-full">
            <div className="container m-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Proyectos Destacados
                  </h2>
                  <p className="text-muted-foreground">
                    Los trabajos más populares de la semana
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">
                    Ver Todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Masonry Grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {featuredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="break-inside-avoid group cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
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
                            asChild
                          >
                            <Link to={`/project/${project.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={project.author.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {project.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {project.author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              @{project.author.username}
                            </p>
                          </div>
                        </div>
                        {/* <AddToCollectionDialog
                        projectId={project.id}
                        projectTitle={project.title}
                        projectImage={project.image}
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        }
                      /> */}
                      </div>

                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 2}
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
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground w-full">
            <div className="container m-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para Mostrar tu Talento?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Únete a miles de freelancers que ya están compartiendo sus
                proyectos y construyendo su reputación profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="h-12 px-8">
                  Crear Cuenta Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Ver Demo
                  <Play className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}
