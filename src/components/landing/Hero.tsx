
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Package, Utensils, Pill } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const industries = [
    {
      icon: Utensils,
      name: "Restaurante",
      description: "Gestión de mesas, comandas y cocina"
    },
    {
      icon: Pill,
      name: "Botica",
      description: "Control de lotes, vencimientos y recetas"
    },
    {
      icon: Package,
      name: "Ferretería",
      description: "Venta por peso, metro y cotizaciones"
    },
    {
      icon: ShoppingCart,
      name: "Minimarket",
      description: "Control de inventario y ventas rápidas"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Sistema SaaS
            <span className="gradient-bg bg-clip-text text-transparent"> Multirubro</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Una plataforma centralizada que se adapta a tu negocio: Restaurante, Botica, Ferretería y más. 
            Con facturación electrónica SUNAT, control de inventario y módulos especializados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6 hover-lift">
                Probar Demo Gratuito
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift">
              Ver Planes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {industries.map((industry, index) => (
            <Card key={index} className="p-6 text-center hover-lift bg-card/80 backdrop-blur-sm border-border/50">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <industry.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{industry.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{industry.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Integración SUNAT incluida - Facturación electrónica automática
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
