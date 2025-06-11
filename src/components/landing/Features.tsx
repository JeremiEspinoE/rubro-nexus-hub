
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  BarChart, 
  Users, 
  Package,
  ShoppingCart,
  CreditCard,
  Settings,
  PieChart
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: ShoppingCart,
      title: "Punto de Venta",
      description: "Sistema POS intuitivo con búsqueda automática de clientes por DNI/RUC",
      badge: "Todos los rubros"
    },
    {
      icon: Package,
      title: "Gestión de Almacén",
      description: "Control completo de inventario con kardex automático y alertas de stock",
      badge: "Inventario inteligente"
    },
    {
      icon: ShieldCheck,
      title: "Facturación SUNAT",
      description: "Boletas y facturas electrónicas automáticas con envío directo a SUNAT",
      badge: "100% Legal"
    },
    {
      icon: Users,
      title: "Multi-sucursal",
      description: "Maneja múltiples sucursales desde una sola cuenta con control independiente",
      badge: "Escalable"
    },
    {
      icon: CreditCard,
      title: "Control de Caja",
      description: "Arqueo automático, historial detallado y cierre de caja por turnos",
      badge: "Auditoría completa"
    },
    {
      icon: BarChart,
      title: "Reportes Avanzados",
      description: "Análisis de ventas, comparativas y reportes exportables en tiempo real",
      badge: "Business Intelligence"
    }
  ];

  const specializedModules = [
    {
      industry: "Restaurante",
      icon: "🍽️",
      features: [
        "Gestión de mesas y salones",
        "Comandas por mozo",
        "Notificaciones a cocina",
        "División de cuenta",
        "Menús QR para clientes"
      ],
      color: "bg-orange-500/10 text-orange-700"
    },
    {
      industry: "Botica",
      icon: "💊",
      features: [
        "Venta fraccionada (pastillas)",
        "Control de lotes y vencimientos",
        "Gestión de recetas médicas",
        "Productos regulados",
        "Alertas de caducidad"
      ],
      color: "bg-green-500/10 text-green-700"
    },
    {
      industry: "Ferretería",
      icon: "🔧",
      features: [
        "Venta por peso/metro/unidad",
        "Conversión entre medidas",
        "Cotizaciones con validez",
        "Gestión de proveedores",
        "Compras frecuentes"
      ],
      color: "bg-blue-500/10 text-blue-700"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Core Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Módulos Centrales
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades esenciales que están disponibles en todos los rubros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="p-6 hover-lift border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <Badge variant="secondary" className="text-xs">{feature.badge}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Specialized Modules */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Módulos Especializados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades específicas según el rubro de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specializedModules.map((module, index) => (
            <Card key={index} className="p-6 hover-lift border-border/50">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{module.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{module.industry}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${module.color}`}>
                  Módulo especializado
                </div>
              </div>
              <ul className="space-y-3">
                {module.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* SUNAT Integration Highlight */}
        <div className="mt-20">
          <Card className="p-8 bg-gradient-to-r from-success/5 to-primary/5 border-success/20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <ShieldCheck className="w-12 h-12 text-success" />
              <div>
                <h3 className="text-2xl font-bold text-foreground">Integración SUNAT Completa</h3>
                <p className="text-muted-foreground">Cumple con todas las normativas fiscales peruanas</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-success mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Comprobantes electrónicos válidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Envío automático a SUNAT</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">0</div>
                <div className="text-sm text-muted-foreground">Errores de configuración</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
