import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Shield } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "S/ 0",
      period: "por mes",
      description: "Perfecto para probar el sistema",
      features: [
        "1 sucursal",
        "Hasta 50 productos",
        "10 comprobantes/mes",
        "1 usuario",
        "Soporte por email"
      ],
      limitations: [
        "Sin reportes avanzados",
        "Sin multi-sucursal"
      ],
      buttonText: "Comenzar Gratis",
      popular: false
    },
    {
      name: "Básico",
      price: "S/ 89",
      period: "por mes",
      description: "Ideal para pequeños negocios",
      features: [
        "Hasta 3 sucursales",
        "Productos ilimitados",
        "500 comprobantes/mes",
        "Hasta 5 usuarios",
        "Reportes básicos",
        "Soporte telefónico",
        "Módulos especializados"
      ],
      buttonText: "Elegir Básico",
      popular: true
    },
    {
      name: "Empresarial",
      price: "S/ 189",
      period: "por mes",
      description: "Para empresas en crecimiento",
      features: [
        "Hasta 10 sucursales",
        "Productos ilimitados",
        "2000 comprobantes/mes",
        "Hasta 15 usuarios",
        "Reportes avanzados",
        "API para integraciones",
        "Soporte prioritario",
        "Capacitación incluida"
      ],
      buttonText: "Elegir Empresarial",
      popular: false
    },
    {
      name: "Full",
      price: "S/ 349",
      period: "por mes",
      description: "Solución completa sin límites",
      features: [
        "Sucursales ilimitadas",
        "Productos ilimitados",
        "Comprobantes ilimitados",
        "Usuarios ilimitados",
        "Business Intelligence",
        "API completa",
        "Soporte 24/7",
        "Gestor de cuenta dedicado",
        "Personalizaciones"
      ],
      buttonText: "Contactar Ventas",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Planes que se Adaptan a tu Negocio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Desde emprendedores hasta grandes empresas. Todos los planes incluyen facturación SUNAT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`p-6 relative hover-lift ${
              plan.popular ? 'border-primary border-2 shadow-lg' : 'border-border/50'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Más Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <Button 
                className={`w-full mb-6 ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-center gap-3 text-sm">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0"></div>
                    <span className="text-muted-foreground line-through">{limitation}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas más de 10 sucursales o funcionalidades específicas?
          </p>
          <Button variant="outline" className="hover-lift">
            Solicitar Cotización Personalizada
          </Button>
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Garantía de Satisfacción
            </h3>
            <p className="text-muted-foreground">
              Prueba nuestro sistema por 30 días. Si no estás satisfecho, te devolvemos tu dinero.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Sin Compromiso</h4>
              <p className="text-sm text-muted-foreground">Cancela cuando quieras, sin penalizaciones</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Datos Seguros</h4>
              <p className="text-sm text-muted-foreground">Tus datos están protegidos y siempre disponibles</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Soporte Incluido</h4>
              <p className="text-sm text-muted-foreground">Capacitación y soporte en todos los planes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
