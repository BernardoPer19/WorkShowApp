import { Link } from "react-router-dom";
import { useSave } from "../../../../../src/features/projects/hooks/useSave";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { TabsContent } from "../../../../components/ui/tabs";

export default function Collections() {
  const { savedProjects, isLoading, isError } = useSave();

  if (isLoading) return <p>Cargando proyectos guardados...</p>;
  if (isError) return <p>Ocurrió un error al cargar los proyectos.</p>;

  return (
    <TabsContent value="collections">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProjects.map((collection) => (
          <Card
            key={collection.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={collection.project.images[0] || "/placeholder.svg"}
                alt={collection.project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{collection.project.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {collection.project.descCorta}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{collection.project.duration}</span>
                <Button variant="ghost" size="sm">
                  <Link to={`/project/${collection.projectId}`}>
                    Ver Proyecto
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
