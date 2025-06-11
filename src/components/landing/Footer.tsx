
import { ShoppingCart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">SistemaMultirubro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La plataforma SaaS más completa para gestionar tu negocio, 
              sin importar el rubro. Con integración SUNAT y módulos especializados.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Rubros</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Restaurante</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Botica</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Ferretería</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Minimarket</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Otros rubros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Funciones</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Punto de Venta</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Facturación SUNAT</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Control de Inventario</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Reportes</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Multi-sucursal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Videos Tutorial</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contactar Soporte</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 SistemaMultirubro. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              SUNAT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
