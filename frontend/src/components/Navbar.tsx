import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import {
  Search,
  Plus,
  Heart,
  Bell,
  Settings,
  User,
  LogOut,
  Palette,
  Code,
  Camera,
  Pen,
  Music,
  TrendingUp,
  BookOpen,
  Users,
  Star,
  Bookmark,
  Grid3X3,
  Zap,
  Award,
  Target,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AuthContext,
  useAuthContext,
} from "../features/auth/context/AuthContext";

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

const exploreItems = [
  {
    title: "Trending Ahora",
    description: "Los proyectos más populares de la semana",
    icon: TrendingUp,
    href: "/trending",
    badge: "Hot",
  },
  {
    title: "Nuevos Talentos",
    description: "Descubre freelancers emergentes",
    icon: Star,
    href: "/new-talents",
    badge: "Nuevo",
  },
  {
    title: "Proyectos Destacados",
    description: "Selección curada por nuestro equipo",
    icon: Award,
    href: "/featured",
    badge: "Curado",
  },
  {
    title: "Inspiración Diaria",
    description: "Ideas frescas para tu próximo proyecto",
    icon: Lightbulb,
    href: "/inspiration",
  },
];

const resourcesItems = [
  {
    title: "Blog CreativeHub",
    description: "Artículos, tutoriales y tendencias",
    icon: BookOpen,
    href: "/blog",
  },
  {
    title: "Guías de Diseño",
    description: "Aprende las mejores prácticas",
    icon: Target,
    href: "/guides",
  },
  {
    title: "Herramientas",
    description: "Recursos útiles para freelancers",
    icon: Zap,
    href: "/tools",
  },
  {
    title: "Comunidad",
    description: "Conecta con otros creativos",
    icon: Users,
    href: "/community",
  },
];

interface NavbarProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const { isAuthenticated } = useAuthContext();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">CreativeHub</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Explorar */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explorar</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    {exploreItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Categorías */}
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

              {/* Recursos */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{item.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Enlaces directos */}
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Nosotros
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 w-96">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar proyectos, freelancers, categorías..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side */}
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Create Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="hidden sm:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Crear Contenido</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Nuevo Proyecto
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Nueva Colección
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Escribir Artículo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="space-y-2 p-2">
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>CL</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Carlos López</span> le
                          dio like a tu proyecto
                        </p>
                        <p className="text-xs text-muted-foreground">
                          hace 2 horas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Ana Sánchez</span>{" "}
                          comentó en tu proyecto
                        </p>
                        <p className="text-xs text-muted-foreground">
                          hace 5 horas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Diego Martín</span>{" "}
                          comenzó a seguirte
                        </p>
                        <p className="text-xs text-muted-foreground">
                          hace 1 día
                        </p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center">
                    Ver todas las notificaciones
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Favorites */}
              <Button variant="ghost" size="icon" asChild>
                <Link to="/favorites">
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>TU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Tu Usuario
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        tu@email.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile/tu-usuario">
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/collections">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Mis Colecciones
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost">
                <Link to={"/auth/login"}>Iniciar Sesión</Link>
              </Button>
              <Button>
                <Link to={"auth/register"}>Registrarse</Link>
              </Button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden border-t p-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
