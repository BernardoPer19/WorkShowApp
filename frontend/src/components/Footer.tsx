import { Palette } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container m-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Palette className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">WorkShow</span>
              </div>
              <p className="text-gray-400 text-sm">
                La plataforma líder para freelancers creativos. Comparte,
                descubre y conecta.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Explorar</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trending"
                    className="hover:text-white transition-colors"
                  >
                    Trending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/new-talents"
                    className="hover:text-white transition-colors"
                  >
                    Nuevos Talentos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/featured"
                    className="hover:text-white transition-colors"
                  >
                    Destacados
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="hover:text-white transition-colors"
                  >
                    Guías
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tools"
                    className="hover:text-white transition-colors"
                  >
                    Herramientas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="hover:text-white transition-colors"
                  >
                    Comunidad
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
                    Sobre Nosotros
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
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contacto
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

export default Footer;
