import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import {
  NavigationMenu,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Search, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../features/auth/context/AuthContext";
import UserMenu from "./NavComponets/UserMenu";
import CategoriesNav from "./NavComponets/CategoriesNav";
import NavigationLinks from "./NavComponets/NavigationLinks";
import CreateButton from "../features/projects/components/CreateButtibn";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuthContext();

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
              <CategoriesNav />

              {/* Enlaces directos */}
              <NavigationLinks />
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
              <CreateButton />

              {/* User Menu */}
              <UserMenu />
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
