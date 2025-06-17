import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTAsection() {
  return (
    <div>
      <section className="py-20 bg-blue-600 text-white">
        <div className="container px-4 m-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un Proyecto de Desarrollo Web?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Comparte tu trabajo con miles de desarrolladores y recibe feedback
            valioso de la comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Subir Proyecto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link to="/categories">
                Explorar Más Categorías
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CTAsection;
