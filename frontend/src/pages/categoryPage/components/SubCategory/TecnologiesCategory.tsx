import { Card, CardContent } from "../../../../components/ui/card";
import { frameworks } from "../../mocks/frameworks2"; 
import type { Framework } from "../../types/frameworks"; 

interface TecnologiesCategoryProps {
  category: string; 
}

function TecnologiesCategory({ category }: TecnologiesCategoryProps) {

  const normalizedCategory = category.toLowerCase();

  const technologiesToDisplay: Framework[] =
    frameworks[normalizedCategory as keyof typeof frameworks] || [];

  if (technologiesToDisplay.length === 0) {
    return null;
  }

  return (
    <div>
      <section className="py-12 bg-white">
        <div className="container px-4 m-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Frameworks y Tecnologías Populares en{" "}
              {/* Capitalizamos la primera letra para el título */}
              {normalizedCategory.charAt(0).toUpperCase() +
                normalizedCategory.slice(1)}
            </h2>
            <p className="text-muted-foreground">
              Explora proyectos por las tecnologías más utilizadas en esta área
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {/* Mapeamos sobre las tecnologías de la categoría actual */}
            {technologiesToDisplay.map((framework) => (
              <Card
                key={framework.name} // La clave debe ser única, el nombre es una buena opción
                className="text-center hover:shadow-md transition-shadow cursor-pointer hover:border-primary"
              >
                <CardContent className="p-4">
                  {/* Renderizamos el componente de icono.
                      Asegúrate de que 'framework.icon' sea un componente de React válido (como los de Lucide). */}
                  {framework.icon && (
                    <framework.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  )}
                  <h3 className="font-medium text-sm mb-1">{framework.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {framework.count} proyectos
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TecnologiesCategory;