import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Code,
  Palette,
  Camera,
  Music,
  Pen,
  Star,
  Users,
  ArrowRight,
  Heart,
  MessageCircle,
  // Bookmark,
  Eye,
  ExternalLink,
  Play,
} from "lucide-react";
import Navbar from "../../components/Navbar";
// import AddToCollectionDialog from "@/components/add-to-collection-dialog";
import { Link } from "react-router-dom";

// Mock data
const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "Modern dashboard design for online store management",
    image: "/placeholder.svg?height=300&width=400",
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
    id: 2,
    title: "Mobile Banking App",
    description: "Clean and secure banking application interface",
    image: "/placeholder.svg?height=400&width=300",
    author: {
      name: "Carlos Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "carlos_dev",
    },
    category: "Mobile Development",
    likes: 189,
    comments: 12,
    views: 890,
    tags: ["React Native", "Banking", "Security"],
  },
  {
    id: 3,
    title: "Brand Identity Design",
    description: "Complete branding package for tech startup",
    image: "/placeholder.svg?height=250&width=400",
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
    image: "/placeholder.svg?height=350&width=300",
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
    image: "/placeholder.svg?height=280&width=400",
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
  {
    id: 6,
    title: "Illustration Series",
    description: "Digital illustrations for children's book",
    image: "/placeholder.svg?height=400&width=300",
    author: {
      name: "Pablo Ruiz",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "pablo_art",
    },
    category: "Illustration",
    likes: 445,
    comments: 52,
    views: 2100,
    tags: ["Illustration", "Children", "Digital Art"],
  },
];

const categories = [
  { name: "UI/UX Design", icon: Palette, count: 1234 },
  { name: "Web Development", icon: Code, count: 987 },
  { name: "Photography", icon: Camera, count: 756 },
  { name: "Illustration", icon: Pen, count: 543 },
  { name: "Music", icon: Music, count: 321 },
];

const topFreelancers = [
  {
    name: "María García",
    username: "maria_design",
    avatar: "/placeholder.svg?height=60&width=60",
    specialty: "UI/UX Designer",
    followers: 12500,
    projects: 89,
    rating: 4.9,
  },
  {
    name: "Carlos Rodríguez",
    username: "carlos_dev",
    avatar: "/placeholder.svg?height=60&width=60",
    specialty: "Full Stack Developer",
    followers: 8900,
    projects: 67,
    rating: 4.8,
  },
  {
    name: "Ana López",
    username: "ana_brand",
    avatar: "/placeholder.svg?height=60&width=60",
    specialty: "Brand Designer",
    followers: 15200,
    projects: 134,
    rating: 5.0,
  },
];

export default function HomePage() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 justify-center items-center w-full">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container px-4">
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
                  Únete como Freelancer
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Proyectos</div>
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
        <section className="py-16 bg-white">
          <div className="container px-4">
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
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
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

        {/* Top Freelancers */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Freelancers Destacados
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conecta con los profesionales más talentosos de nuestra
                comunidad
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {topFreelancers.map((freelancer) => (
                <Card
                  key={freelancer.username}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage
                        src={freelancer.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>{freelancer.name[0]}</AvatarFallback>
                    </Avatar>

                    <h3 className="font-semibold text-lg mb-1">
                      {freelancer.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      @{freelancer.username}
                    </p>
                    <p className="text-primary font-medium mb-4">
                      {freelancer.specialty}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="font-semibold">
                          {freelancer.followers.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Seguidores
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">
                          {freelancer.projects}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Proyectos
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {freelancer.rating}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/profile/${freelancer.username}`}>
                        <Users className="h-4 w-4 mr-2" />
                        Ver Perfil
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Mostrar tu Talento?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Únete a miles de freelancers que ya están compartiendo sus
              proyectos y construyendo su reputación profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8"
                onClick={() => setIsLoggedIn(true)}
              >
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Palette className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">CreativeHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                La plataforma líder para freelancers creativos. Comparte,
                descubre y conecta.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Explorar</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trending"
                    className="hover:text-white transition-colors"
                  >
                    Trending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/new-talents"
                    className="hover:text-white transition-colors"
                  >
                    Nuevos Talentos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/featured"
                    className="hover:text-white transition-colors"
                  >
                    Destacados
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="hover:text-white transition-colors"
                  >
                    Guías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tools"
                    className="hover:text-white transition-colors"
                  >
                    Herramientas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="hover:text-white transition-colors"
                  >
                    Comunidad
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="hover:text-white transition-colors"
                  >
                    Prensa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CreativeHub. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacidad
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Términos
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
