
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SistemaMultirubro</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-muted-foreground hover:text-foreground transition-colors">
              Inicio
            </a>
            <a href="#funciones" className="text-muted-foreground hover:text-foreground transition-colors">
              Funciones
            </a>
            <a href="#rubros" className="text-muted-foreground hover:text-foreground transition-colors">
              Rubros
            </a>
            <a href="#planes" className="text-muted-foreground hover:text-foreground transition-colors">
              Planes
            </a>
            <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Iniciar Sesión
            </Button>
            <Button className="hover-lift">
              Empezar Gratis
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
