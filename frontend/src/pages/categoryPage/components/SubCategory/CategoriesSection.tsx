import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import {  Server, Globe, Database, Layers } from "lucide-react";



function CategoriesSection() {
  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="container px-4 m-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Especialidades de Desarrollo Web
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora proyectos por área de especialización
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interfaces de usuario, SPAs, y experiencias web interactivas
                </p>
                <Badge variant="secondary">4,500+ proyectos</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Server className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold text-lg mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  APIs, servidores, y lógica de negocio
                </p>
                <Badge variant="secondary">3,200+ proyectos</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Layers className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="font-semibold text-lg mb-2">Full Stack</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aplicaciones completas de principio a fin
                </p>
                <Badge variant="secondary">2,800+ proyectos</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Database className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="font-semibold text-lg mb-2">DevOps</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  CI/CD, contenedores, y infraestructura como código
                </p>
                <Badge variant="secondary">1,500+ proyectos</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CategoriesSection;
