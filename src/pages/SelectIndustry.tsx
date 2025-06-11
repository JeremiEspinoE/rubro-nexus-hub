
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Package, Utensils, Pill, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SelectIndustry = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sunatData, setSunatData] = useState({
    ruc: '',
    claveSol: ''
  });
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const { toast } = useToast();

  const industries = [
    {
      id: 'restaurante',
      name: 'Restaurante',
      icon: Utensils,
      description: 'Gestión de mesas, comandas y cocina',
      features: ['Gestión de mesas', 'Comandas por mozo', 'Notificaciones a cocina', 'División de cuenta', 'QR para clientes']
    },
    {
      id: 'botica',
      name: 'Botica',
      icon: Pill,
      description: 'Control de lotes, vencimientos y recetas',
      features: ['Venta fraccionada', 'Control de lotes', 'Recetas médicas', 'Productos regulados', 'Alertas de vencimiento']
    },
    {
      id: 'ferreteria',
      name: 'Ferretería',
      icon: Package,
      description: 'Venta por peso, metro y cotizaciones',
      features: ['Venta por peso/metro', 'Conversión de medidas', 'Cotizaciones', 'Gestión de proveedores', 'Compras frecuentes']
    },
    {
      id: 'minimarket',
      name: 'Minimarket',
      icon: ShoppingCart,
      description: 'Control de inventario y ventas rápidas',
      features: ['Inventario ágil', 'Ventas rápidas', 'Control de stock', 'Múltiples categorías', 'Ofertas y promociones']
    }
  ];

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setIsValidated(false);
  };

  const handleSunatValidation = async () => {
    if (!sunatData.ruc || !sunatData.claveSol) {
      toast({
        title: "Error",
        description: "Debes completar el RUC y Clave SOL",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);

    // Simular validación con SUNAT
    setTimeout(() => {
      setIsValidated(true);
      setIsValidating(false);
      toast({
        title: "¡Validación exitosa!",
        description: "Tu empresa está autorizada para emitir comprobantes electrónicos"
      });
    }, 2000);
  };

  const handleContinue = () => {
    // Redirigir al dashboard
    window.location.href = '/dashboard';
  };

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SistemaMultirubro</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Selecciona tu Rubro</h1>
          <p className="text-muted-foreground">Elige el tipo de negocio para activar los módulos específicos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {industries.map((industry) => (
            <Card 
              key={industry.id}
              className={`p-6 cursor-pointer transition-all hover-lift ${
                selectedIndustry === industry.id 
                  ? 'border-primary border-2 bg-primary/5' 
                  : 'border-border/50 hover:border-primary/50'
              }`}
              onClick={() => handleIndustrySelect(industry.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedIndustry === industry.id ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  <industry.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{industry.name}</h3>
                  <p className="text-muted-foreground text-sm">{industry.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Características específicas:</p>
                <ul className="space-y-1">
                  {industry.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {selectedIndustry && (
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Validación SUNAT</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Para activar la facturación electrónica, necesitamos validar tu empresa con SUNAT
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="ruc">RUC de la Empresa</Label>
                <Input
                  id="ruc"
                  type="text"
                  maxLength={11}
                  value={sunatData.ruc}
                  onChange={(e) => setSunatData({...sunatData, ruc: e.target.value})}
                  placeholder="20123456789"
                />
              </div>
              <div>
                <Label htmlFor="claveSol">Clave SOL</Label>
                <Input
                  id="claveSol"
                  type="password"
                  value={sunatData.claveSol}
                  onChange={(e) => setSunatData({...sunatData, claveSol: e.target.value})}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleSunatValidation}
                disabled={isValidating || isValidated}
                variant={isValidated ? "default" : "outline"}
              >
                {isValidating ? "Validando..." : isValidated ? "✓ Validado" : "Validar con SUNAT"}
              </Button>
              
              {isValidated && (
                <Button onClick={handleContinue} className="bg-success hover:bg-success/90">
                  Ir al Sistema
                </Button>
              )}
            </div>

            {isValidated && (
              <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-success text-sm">
                  ✓ Empresa validada correctamente. Autorizada para emitir comprobantes electrónicos.
                </p>
              </div>
            )}
          </Card>
        )}

        {selectedIndustryData && (
          <Card className="p-6 bg-card/80 backdrop-blur-sm">
            <h4 className="font-semibold text-foreground mb-3">
              Módulos que se activarán para {selectedIndustryData.name}:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="text-muted-foreground">• Punto de Venta</div>
              <div className="text-muted-foreground">• Gestión de Almacén</div>
              <div className="text-muted-foreground">• Control de Caja</div>
              <div className="text-muted-foreground">• Facturación SUNAT</div>
              <div className="text-muted-foreground">• Gestión de Clientes</div>
              <div className="text-muted-foreground">• Reportes Avanzados</div>
              <div className="text-muted-foreground">• Multi-sucursal</div>
              <div className="text-primary font-medium">+ Módulos específicos</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SelectIndustry;
