import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "..//components/ui/card";
import { Badge } from "..//components/ui/badge";
import { Input } from "..//components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "..//components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "..//components/ui/select";
import {
  Search,
  TrendingUp,
  Eye,
  Star,
  Palette,
  Code,
  Camera,
  Pen,
  Music,
  Grid3X3,
  List,
} from "lucide-react";

const categories = [
  {
    id: "design",
    name: "Diseño",
    icon: Palette,
    color: "bg-purple-100 text-purple-600",
    description: "Interfaces, gráficos, branding y más",
    projectCount: 15420,
    freelancerCount: 3240,
    trending: true,
    subcategories: [
      { name: "UI/UX Design", count: 5420, growth: "+12%" },
      { name: "Graphic Design", count: 3240, growth: "+8%" },
      { name: "Logo Design", count: 2890, growth: "+15%" },
      { name: "Brand Identity", count: 2100, growth: "+6%" },
      { name: "Web Design", count: 1770, growth: "+10%" },
    ],
    featuredProjects: [
      {
        id: 1,
        title: "E-commerce Dashboard",
        image: "/placeholder.svg?height=200&width=300",
        author: "María García",
        likes: 234,
        views: 1200,
      },
      {
        id: 2,
        title: "Mobile Banking App",
        image: "/placeholder.svg?height=200&width=300",
        author: "Carlos López",
        likes: 189,
        views: 890,
      },
      {
        id: 3,
        title: "Brand Identity Package",
        image: "/placeholder.svg?height=200&width=300",
        author: "Ana Sánchez",
        likes: 156,
        views: 670,
      },
    ],
  },
  {
    id: "development",
    name: "Desarrollo",
    icon: Code,
    color: "bg-blue-100 text-blue-600",
    description: "Web, móvil, backend y frontend",
    projectCount: 12890,
    freelancerCount: 2890,
    trending: true,
    subcategories: [
      { name: "Web Development", count: 4200, growth: "+18%" },
      { name: "Mobile Apps", count: 3100, growth: "+22%" },
      { name: "Backend", count: 2890, growth: "+14%" },
      { name: "Frontend", count: 2700, growth: "+16%" },
    ],
    featuredProjects: [
      {
        id: 4,
        title: "React Portfolio",
        image: "/placeholder.svg?height=200&width=300",
        author: "Diego Martín",
        likes: 298,
        views: 1450,
      },
      {
        id: 5,
        title: "E-learning Platform",
        image: "/placeholder.svg?height=200&width=300",
        author: "Laura Ruiz",
        likes: 167,
        views: 920,
      },
    ],
  },
  {
    id: "photography",
    name: "Fotografía",
    icon: Camera,
    color: "bg-green-100 text-green-600",
    description: "Retratos, productos, eventos y más",
    projectCount: 8940,
    freelancerCount: 1890,
    trending: false,
    subcategories: [
      { name: "Portrait Photography", count: 2890, growth: "+5%" },
      { name: "Product Photography", count: 2340, growth: "+12%" },
      { name: "Event Photography", count: 1890, growth: "+3%" },
      { name: "Nature Photography", count: 1820, growth: "+7%" },
    ],
    featuredProjects: [
      {
        id: 6,
        title: "Fashion Portraits",
        image: "/placeholder.svg?height=200&width=300",
        author: "Sofia Chen",
        likes: 445,
        views: 2100,
      },
    ],
  },
  {
    id: "writing",
    name: "Escritura",
    icon: Pen,
    color: "bg-orange-100 text-orange-600",
    description: "Copywriting, contenido, blogs y más",
    projectCount: 6780,
    freelancerCount: 1560,
    trending: false,
    subcategories: [
      { name: "Copywriting", count: 2340, growth: "+9%" },
      { name: "Content Writing", count: 1890, growth: "+6%" },
      { name: "Technical Writing", count: 1450, growth: "+4%" },
      { name: "Creative Writing", count: 1100, growth: "+8%" },
    ],
    featuredProjects: [
      {
        id: 7,
        title: "SaaS Landing Copy",
        image: "/placeholder.svg?height=200&width=300",
        author: "Pablo Ruiz",
        likes: 234,
        views: 890,
      },
    ],
  },
  {
    id: "music",
    name: "Audio",
    icon: Music,
    color: "bg-pink-100 text-pink-600",
    description: "Música, podcasts, efectos de sonido",
    projectCount: 4560,
    freelancerCount: 890,
    trending: false,
    subcategories: [
      { name: "Music Production", count: 1890, growth: "+11%" },
      { name: "Sound Design", count: 1340, growth: "+7%" },
      { name: "Podcast Editing", count: 890, growth: "+15%" },
      { name: "Voice Over", count: 440, growth: "+5%" },
    ],
    featuredProjects: [
      {
        id: 8,
        title: "Podcast Intro Music",
        image: "/placeholder.svg?height=200&width=300",
        author: "Elena Vega",
        likes: 178,
        views: 560,
      },
    ],
  },
  {
    id: "video",
    name: "Video",
    icon: Camera,
    color: "bg-red-100 text-red-600",
    description: "Edición, animación, motion graphics",
    projectCount: 7890,
    freelancerCount: 1340,
    trending: true,
    subcategories: [
      { name: "Video Editing", count: 2890, growth: "+20%" },
      { name: "Animation", count: 2340, growth: "+25%" },
      { name: "Motion Graphics", count: 1890, growth: "+18%" },
      { name: "3D Animation", count: 770, growth: "+30%" },
    ],
    featuredProjects: [
      {
        id: 9,
        title: "Product Animation",
        image: "/placeholder.svg?height=200&width=300",
        author: "Roberto Silva",
        likes: 356,
        views: 1890,
      },
    ],
  },
];


export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className=" px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Explora por Categorías
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Descubre proyectos increíbles organizados por especialidad.
                Encuentra inspiración y conecta con freelancers talentosos.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar categorías, proyectos, freelancers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 h-12">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Más Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="recent">Más Reciente</SelectItem>
                    <SelectItem value="projects">Más Proyectos</SelectItem>
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
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">
                      Proyectos Totales
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">12K+</div>
                    <div className="text-sm text-muted-foreground">
                      Freelancers Activos
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">25+</div>
                    <div className="text-sm text-muted-foreground">
                      Especialidades
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Países</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 container m-auto">
          <div className=" px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}
                      >
                        <category.icon className="h-6 w-6" />
                      </div>
                      {category.trending && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {category.projectCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Proyectos
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {category.freelancerCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Freelancers
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">
                        Subcategorías populares:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <Badge
                            key={sub.name}
                            variant="outline"
                            className="text-xs"
                          >
                            {sub.name}
                          </Badge>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.subcategories.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explorar {category.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects by Category */}
        <section className="py-16 bg-white container m-auto">
          <div className=" px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Proyectos Destacados por Categoría
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Los mejores trabajos de cada especialidad seleccionados por
                nuestra comunidad.
              </p>
            </div>

            <Tabs defaultValue="design" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                {categories.slice(0, 6).map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.featuredProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="group cursor-pointer hover:shadow-lg transition-shadow"
                      >
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Ver Proyecto
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            por {project.author}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{project.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{project.likes}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                      Ver Todos los Proyectos de {category.name}
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary w-full text-primary-foreground ">
          <div className=" px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿No Encuentras lo que Buscas?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Publica tu proyecto y deja que los freelancers vengan a ti. Recibe
              propuestas personalizadas en minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Publicar Proyecto
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Explorar Más
              </Button>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
