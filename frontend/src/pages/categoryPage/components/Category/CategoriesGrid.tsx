import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../types/CategoriesMockesTypes";


type Props = {
  filteredCategories: Category[];
};
function CategoriesGrid({ filteredCategories }: Props) {
  return (
    <div>
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
                    <Link to={`/category/${category.name}`}>
                      Explorar {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CategoriesGrid;
