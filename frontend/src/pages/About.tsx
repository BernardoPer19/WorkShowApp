import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Users,
  Target,
  Heart,
  Zap,
  Globe,
  TrendingUp,
  Shield,
  Lightbulb,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Freelancers Activos", value: "50,000+", icon: Users },
  { label: "Proyectos Publicados", value: "250,000+", icon: Target },
  { label: "Países Representados", value: "120+", icon: Globe },
  { label: "Horas de Trabajo", value: "2M+", icon: TrendingUp },
];

const values = [
  {
    icon: Heart,
    title: "Pasión por la Creatividad",
    description:
      "Creemos que la creatividad es el motor del progreso y la innovación en el mundo digital.",
  },
  {
    icon: Users,
    title: "Comunidad Primero",
    description:
      "Construimos una plataforma donde los freelancers pueden crecer, aprender y conectar entre sí.",
  },
  {
    icon: Shield,
    title: "Confianza y Seguridad",
    description:
      "Protegemos tanto a freelancers como a clientes con sistemas seguros y transparentes.",
  },
  {
    icon: Zap,
    title: "Innovación Constante",
    description:
      "Siempre estamos mejorando la plataforma con nuevas funcionalidades y tecnologías.",
  },
];

const team = [
  {
    name: "Elena Rodríguez",
    role: "CEO & Fundadora",
    bio: "Ex-directora de producto en Adobe. Apasionada por empoderar a los creativos.",
    image: "/placeholder.svg?height=120&width=120",
    social: {
      linkedin: "elena-rodriguez",
      twitter: "elena_creates",
    },
  },
  {
    name: "Marco Silva",
    role: "CTO",
    bio: "Ingeniero de software con 15 años de experiencia en plataformas escalables.",
    image: "/placeholder.svg?height=120&width=120",
    social: {
      linkedin: "marco-silva-tech",
      twitter: "marco_codes",
    },
  },
  {
    name: "Sofia Chen",
    role: "Head of Design",
    bio: "Diseñadora UX con experiencia en Airbnb y Spotify. Obsesionada con la experiencia del usuario.",
    image: "/placeholder.svg?height=120&width=120",
    social: {
      linkedin: "sofia-chen-design",
      twitter: "sofia_designs",
    },
  },
  {
    name: "David López",
    role: "Head of Community",
    bio: "Especialista en construcción de comunidades. Anteriormente en GitHub y Discord.",
    image: "/placeholder.svg?height=120&width=120",
    social: {
      linkedin: "david-lopez-community",
      twitter: "david_community",
    },
  },
];

const milestones = [
  {
    year: "2020",
    title: "Fundación de WorkShow",
    description:
      "Comenzamos con la visión de conectar freelancers creativos con oportunidades globales.",
  },
  {
    year: "2021",
    title: "10,000 Usuarios",
    description:
      "Alcanzamos nuestros primeros 10,000 freelancers registrados en la plataforma.",
  },
  {
    year: "2022",
    title: "Expansión Internacional",
    description:
      "Lanzamos en 50 países y añadimos soporte para múltiples idiomas.",
  },
  {
    year: "2023",
    title: "Serie A",
    description:
      "Recaudamos $15M en Serie A para acelerar el crecimiento y desarrollo de producto.",
  },
  {
    year: "2024",
    title: "IA y Automatización",
    description:
      "Integramos herramientas de IA para mejorar la experiencia de matching y discovery.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container px-4 m-auto">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4">
                Nuestra Historia
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
                Conectando Talento
                <span className="block text-primary">Creativo Global</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
                WorkShow nació de la visión de crear un mundo donde el talento
                creativo no tenga fronteras. Somos más que una plataforma: somos
                una comunidad que impulsa la creatividad y la innovación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-12 px-8">
                  Únete a Nosotros
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Ver Oportunidades
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 m-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:m-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Nuestra Misión
                </Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Democratizando el Acceso al Talento Creativo
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Creemos que el talento creativo debe ser accesible sin
                  importar la ubicación geográfica. Nuestra misión es crear un
                  ecosistema donde freelancers de todo el mundo puedan mostrar
                  su trabajo, conectar con clientes y hacer crecer sus carreras.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Oportunidades Globales
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Conectamos freelancers con proyectos de empresas de todo
                        el mundo.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Herramientas Profesionales
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Proporcionamos las herramientas necesarias para
                        gestionar proyectos y pagos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Comunidad de Apoyo</h4>
                      <p className="text-sm text-muted-foreground">
                        Fomentamos una comunidad donde los creativos se apoyan
                        mutuamente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://tiendada.com/blog/wp-content/uploads/2022/10/ejemplo-liderazgo-trabajo-equipo.jpg"
                  width="600"
                  height="500"
                  alt="Equipo trabajando"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">200%</div>
                      <div className="text-sm text-muted-foreground">
                        Crecimiento anual
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:m-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Nuestros Valores
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Lo Que Nos Impulsa</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estos valores guían cada decisión que tomamos y cada
                funcionalidad que desarrollamos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <value.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 m-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Nuestro Viaje
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Hitos Importantes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Desde nuestros humildes comienzos hasta convertirnos en la
                plataforma líder para freelancers creativos.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.year}
                      className="relative flex items-start gap-6"
                    >
                      {/* Timeline dot */}
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {milestone.year}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <h3 className="text-xl font-semibold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 m-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Nuestro Equipo
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Las Mentes Detrás de WorkShow
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un equipo diverso de profesionales apasionados por empoderar a
                la comunidad creativa global.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.image || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm">
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm">
                        Twitter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 m-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  Contacto
                </Badge>
                <h2 className="text-3xl font-bold mb-4">¿Tienes Preguntas?</h2>
                <p className="text-muted-foreground">
                  Estamos aquí para ayudarte. No dudes en contactarnos para
                  cualquier consulta.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      hola..creativehub.com
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">Oficina</h3>
                    <p className="text-muted-foreground">Madrid, España</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">Comunidad</h3>
                    <p className="text-muted-foreground">Discord & Slack</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 text-center m-auto">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Formar Parte de la Revolución Creativa?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Únete a miles de freelancers que ya están construyendo sus
              carreras en WorkShow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Comenzar Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Explorar Proyectos
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 m-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">WorkShow</span>
              </div>
              <p className="text-gray-400 text-sm">
                Conectando talento creativo con oportunidades globales desde
                2020.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/features"
                    className="hover:text-white transition-colors"
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="hover:text-white transition-colors"
                  >
                    Prensa
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-white transition-colors"
                  >
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/status"
                    className="hover:text-white transition-colors"
                  >
                    Estado del Servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 WorkShow. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacidad
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Términos
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
