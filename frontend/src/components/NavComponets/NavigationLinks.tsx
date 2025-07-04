import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";

function NavigationLinks() {
  return (
    <div>
      {" "}
      <NavigationMenuItem>
        <div className="flex gap-1">
          <Link to="/about">
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
              Nosotros
            </NavigationMenuLink>
          </Link>
          <Link to="/categories">
            <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
              Categorias
            </NavigationMenuLink>
          </Link>
        </div>
      </NavigationMenuItem>
    </div>
  );
}

export default NavigationLinks;
