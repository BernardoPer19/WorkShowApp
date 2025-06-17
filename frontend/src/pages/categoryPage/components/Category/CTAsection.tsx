import { Button } from "../../../../components/ui/button";

function CTAsection() {
  return (
    <div>
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
    </div>
  );
}

export default CTAsection;
