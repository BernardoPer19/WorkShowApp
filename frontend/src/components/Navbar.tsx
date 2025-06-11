import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
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
  User,
  LogOut,
  Palette,
  Code,
  Camera,
  Pen,
  Music,
  TrendingUp,
  Bookmark,
  Grid3X3,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../features/auth/context/AuthContext";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

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

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { isAuthenticated, logout, currentUser } = useAuthContext();
  return (
    <header className=" flex justify-center sticky top-0 z-50 w-full border-b bg-white/95  backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">WorkShow</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
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
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side */}
        <nav className="flex items-center gap-4 ">
          {isAuthenticated ? (
            <>
              {/* Create Button */}
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Proyecto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
                    <DialogDescription>
                      Comparte tu trabajo con la comunidad de CreativeHub
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título del Proyecto</Label>
                      <Input id="title" placeholder="Ej: Diseño de App Móvil" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe tu proyecto..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Imagen del Proyecto</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Arrastra una imagen o haz clic para subir
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="demo-url">URL de Demo (opcional)</Label>
                      <Input id="demo-url" placeholder="https://..." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input id="tags" placeholder="React, UI/UX, Mobile..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>
                      Publicar Proyecto
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

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
                        @{currentUser?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentUser?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
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
                  <DropdownMenuItem>
                    <button
                      onClick={logout}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
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
